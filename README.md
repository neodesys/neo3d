Disfract
========

[![GPLv3 License](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat)](/LICENSE)

Disfract is an experimental journey into the fractal world.

**Contents**

1. [How to build](#how-to-build)
2. [How to contribute](#how-to-contribute)
3. [License](#license)

How to build
------------

You must have [Node.js](https://nodejs.org/) with `npm` installed.  
You also need `grunt-cli` which can be installed directly with `npm` like this:

```
$ npm install -g grunt-cli
```

To build Disfract itself, clone this repository, install dependencies using
`npm` and call `grunt`.

```
$ git clone https://github.com/neodesys/disfract.git Disfract
$ cd Disfract/ide
$ npm install
$ grunt
$ cd ../build
$ xdg-open index.html
```

How to contribute
-----------------

You are welcome to contribute to Disfract.

If you find a bug, have an issue or great ideas to make it better, please
[post an issue](https://guides.github.com/features/issues/).

If you can fix a bug or want to add a feature yourself, please
[fork](https://guides.github.com/activities/forking/) the repository and post a
*Pull Request*.

You can find detailed information about how to contribute in
[GitHub Guides](https://guides.github.com/activities/contributing-to-open-source/).

--------------------------------------------------------------------------------

License
-------

Disfract is released under the [GPLv3 License](/LICENSE).

```
Disfract

Copyright (C) 2015, Loïc Le Page

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```

--------------------------------------------------------------------------------
