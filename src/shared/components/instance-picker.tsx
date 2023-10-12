import classNames from "classnames";
import { Component, linkEvent } from "inferno";
import { All_TOPIC, TOPICS, Topic } from "./instances-definitions";
import { LANGUAGES, i18n } from "../i18next";
import { I18nKeys } from "i18next";
import { Icon } from "./icon";

enum Step {
  Interest,
  Language,
  Join,
}

interface State {
  activeStep: Step;
  topic?: Topic;
  language?: string;
}

export class InstancePicker extends Component<any, State> {
  state: State = {
    activeStep: Step.Interest,
  };
  constructor(props: any, context: any) {
    super(props, context);
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
                {TOPICS.map(c => (
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text text-sm text-gray-300">
                        <Icon icon={c.icon} classes="mr-3" />
                        {i18n.t(c.name as I18nKeys)}
                      </span>
                      <input
                        type="radio"
                        name="topic-radio"
                        className="radio"
                        value={c.name}
                        onChange={linkEvent(this, handleTopicChange)}
                      />
                    </label>
                  </div>
                ))}
              </>
            )}
            {this.state.activeStep == Step.Language && (
              <>
                <p className="text-2xl font-bold text-center pb-4">
                  {i18n.t("what_language")}
                </p>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text text-sm text-gray-300">
                      {i18n.t("all_languages")}
                    </span>
                    <input
                      type="radio"
                      name="language-radio"
                      className="radio"
                      value={"all"}
                      onChange={linkEvent(this, handleLanguageChange)}
                    />
                  </label>
                </div>
                {LANGUAGES.map(l => (
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text text-sm text-gray-300">
                        {l.name}
                      </span>
                      <input
                        type="radio"
                        name="language-radio"
                        className="radio"
                        value={l.code}
                        onChange={linkEvent(this, handleLanguageChange)}
                      />
                    </label>
                  </div>
                ))}
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
              <li
                className={classNames("step text-gray-300", {
                  "step-primary": this.state.activeStep == Step.Join,
                })}
              >
                {i18n.t("join")}
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
    topic: TOPICS.find(c => c.name == event.target.value) ?? All_TOPIC,
    activeStep: Step.Language,
  });
}

function handleLanguageChange(i: InstancePicker, event: any) {
  i.setState({ language: event.target.value });
  const url = `/instances?topic=${i.state.topic?.name ?? All_TOPIC}&language=${
    i.state.language
  }&scroll=true`;

  // Requires a page reload unfortunately
  window.location.href = url;
}

function handleResetInterests(i: InstancePicker) {
  i.setState({ topic: undefined, activeStep: Step.Interest });
}
