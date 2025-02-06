# create library steps

source of creating library steps are found here: https://dev.to/9bytes/how-to-create-react-native-component-library-3266

Note: we will pretend that our package name is: react-native-common and my npm login name is mohammad_obed

0. first create github repo for the package first
1. run: npx create-react-native-library@latest react-native-common
2. Make sure to select JavaScript library in the upcoming dialogue.
3. run: npm i, It could be that you have to run it with the --legacy-peer-deps option, if you get an error. There seems to be a dependency broken at the moment
4. skip running the example project (it does not seem to work)
5. skip this step if you login to npm (run: npm whoami), if not run: npm login, login in browser then proceed
6. in package.json and package-lock.json, change the name from "react-native-common" to "@mohammad_obed/react-native-common"
7. npm publish package public, run: npm publish --access public (whenever you want to update the package you need to raise version number in package.json then again run: npm publish --access public)
8. now go to any project and npm i @mohammad_obed/react-native-common

# allow hot reload workaround

1. in the project where package is downloaded, go to node_modules folder → @mohammad_obed folder, inside: rename the react-native-common to anything else (ex: react-native-common-original)
2. open terminal with the @mohammad_obed folder
3. git clone --filter=blob:none --no-checkout \<repo-url\>
4. cd react-native-common
5. git sparse-checkout init --cone
6. git sparse-checkout set src
7. in file explorer: Modify the .git/info/sparse-checkout file, delete everything in it and type: /src/\*
8. in terminal, run: git sparse-checkout reapply
9. git sparse-checkout reapply
10. react-native-common-original, copy everything inside it to your new react-native-common folder except src
11. you can work now, pull push, whatever

Note: just make sure npm has the newest version from git (meaning when you push work to git, you might as well pull in the main react-native-common folder, then npm publish again) (why? so you might wan to use the common in many other projects, so you just hit with npm install again, or update or whatever just read the other note below)

Note: now you have two approaches to updating the library inside a certain project that already did the steps above:

- just pull changes into your installed library that is inside the node_modules
- or you published the library and you already setup .git/SPARSE of the library in that project but did not commit stuff or wanna test freshly, then just just make backup of .git folder from @mohammad_obed → react-native-common, run npm i @mohammad_obed/react-native-common, then put the .git folder again in the react-native-common
