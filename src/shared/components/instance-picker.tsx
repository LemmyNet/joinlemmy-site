import classNames from "classnames";
import { Component, linkEvent } from "inferno";
import { ALL_TOPIC, TOPICS, Topic } from "./instances-definitions";
import { LANGUAGES, i18n } from "../i18next";
import { I18nKeys } from "i18next";
import { Icon } from "./icon";

enum Step {
  Interest,
  Language,
}

interface Props {
  reset?: boolean;
}

interface State {
  activeStep: Step;
  topic?: Topic;
  language?: string;
}

export class InstancePicker extends Component<Props, State> {
  state: State = {
    activeStep: Step.Interest,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentWillReceiveProps(): void {
    this.setState({
      activeStep: Step.Interest,
    });
  }

  render() {
    return (
      <dialog id="picker" className="modal">
        <form method="dialog" className="modal-backdrop">
          <button>X</button>
        </form>
        <div className="modal-box bg-neutral-800">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="container mx-auto">
            {this.state.activeStep == Step.Interest && (
              <>
                <p className="text-2xl font-bold text-center pb-4">
                  {i18n.t("what_topic")}
                </p>
                <div className="flex flex-row flex-wrap gap-4 pb-4">
                  {TOPICS.map(c => (
                    <button
                      className="btn btn-sm btn-outline normal-case"
                      value={c.name}
                      onClick={linkEvent(this, handleTopicChange)}
                    >
                      <Icon icon={c.icon} />
                      {i18n.t(c.name as I18nKeys)}
                    </button>
                  ))}
                </div>
              </>
            )}
            {this.state.activeStep == Step.Language && (
              <>
                <p className="text-2xl font-bold text-center pb-4">
                  {i18n.t("what_language")}
                </p>
                <div className="flex flex-row flex-wrap gap-4 pb-4">
                  <button
                    className="btn btn-sm btn-outline normal-case"
                    value={"all"}
                    onClick={linkEvent(this, handleLanguageChange)}
                  >
                    {i18n.t("all_languages")}
                  </button>
                  {LANGUAGES.map(l => (
                    <button
                      className="btn btn-sm btn-outline normal-case"
                      value={l.code}
                      onClick={linkEvent(this, handleLanguageChange)}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </>
            )}

            <ul className="steps steps-vertical lg:steps-horizontal w-full">
              <li
                onClick={linkEvent(this, handleResetInterests)}
                className={classNames("step text-gray-300", {
                  "step-primary": this.state.activeStep == Step.Interest,
                })}
              >
                {i18n.t("interests")}
              </li>
              <li
                onClick={linkEvent(this, handleResetInterests)}
                className={classNames("step text-gray-300", {
                  "step-primary": this.state.activeStep == Step.Language,
                })}
              >
                {i18n.t("languages")}
              </li>
            </ul>
          </div>
        </div>
      </dialog>
    );
  }
}

function handleTopicChange(i: InstancePicker, event: any) {
  i.setState({
    topic: TOPICS.find(c => c.name == event.target.value) ?? ALL_TOPIC,
    activeStep: Step.Language,
  });
}

function handleLanguageChange(i: InstancePicker, event: any) {
  i.setState({ language: event.target.value });
  const url = `/instances?topic=${i.state.topic?.name ?? ALL_TOPIC}&language=${
    i.state.language
  }&scroll=true`;

  // Requires a page reload unfortunately
  window.location.href = url;
}

function handleResetInterests(i: InstancePicker) {
  i.setState({ topic: undefined, activeStep: Step.Interest });
}
