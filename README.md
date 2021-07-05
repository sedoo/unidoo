# unidoo

see [Documentation](https://sedoo.github.io/unidoo/)

## Library

## For users

### How to integrate Unidoo in a project

1. Install the module

```
npm i @sedoo/unidoo
```

2. In you main.js add the following lines

```
import Unidoo from '@sedoo/unidoo'
Vue.use(Unidoo)
```

## For developers

### Warning

Unidoo uses the new Github naming convention: the main branch is called *main* and not *master* anymore.


### How to publish the library in NPM ?

The publishing if the library is an automated mechanism based on Github workflow system. No other method should be used.

After each push on the *main* branch, a build is launched. 
If the build is successful, the system will publish it on NPM using the version number indicated in the *package.json* file.
If this version corresponds to an already published version, the build will stop here. Else, the version is published.

Hence, to publish an new version, it is important to modify the number in the *package.json* file.    

## Demo app

To build the demo: 

```shell
npm run build:demo
```

## Usage instructions



## Demonstration

[Live demonstration](https://www.sedoo.fr/demonstration-librairie-unidoo/)
