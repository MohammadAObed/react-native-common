# npm before publish

npm run prepare

# npm publish package public:

npm publish --access public

# npm unpublish by package name

npm unpublish \<package-name\> -f

# install devdependency only

npm i \<package-name\> --save-dev

# install root workspace devdependency only

npm i \<package-name\> --workspace-root --legacy-peer-deps --save-dev

# upgrade dependencies

npx expo install expo@latest -- --save-dev

npx expo install --fix

npm i \<package-name\>@latest --save-dev
