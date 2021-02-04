cargo install mdbook \
  --git https://github.com/Nutomic/mdBook.git \
  --branch localization \
  --rev 0982a82
mdbook build lemmy-docs -d ../static/docs
