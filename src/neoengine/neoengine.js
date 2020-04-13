/**
 * NeoEngine
 *
 * Copyright (C) 2020, Loïc Le Page
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

var Entity = require("./Entity");

//Systems will be initialized and updated in the same order as the
//one defined here for classes importation
var _systemsClasses = [
    require("./world/WorldSystem"),
    require("./rendering/RenderingSystem")
];

var neoengine = module.exports = {};

var _systems = [];
var _rootEntity = null;

neoengine.init = function()
{
    if (_rootEntity)
    {
        return true;
    }

    var nbSystems = _systemsClasses.length;
    for (var i = 0; i < nbSystems; ++i)
    {
        var system = new _systemsClasses[i]();
        if (!system.init())
        {
            window.console.error("cannot initialize " + _systemsClasses[i].constructor.name);
            for (var j = i - 1; j >= 0; --j)
            {
                _systems[j].shut();
            }

            _systems = [];
            return false;
        }

        _systems.append(system);
    }

    _rootEntity = new Entity(null);
    return true;
};

neoengine.shut = function()
{
    if (_rootEntity)
    {
        _rootEntity.destroy();

        var nbSystems = _systems.length;
        for (var i = nbSystems - 1; i >= 0; --i)
        {
            _systems[i].shut();
        }

        _systems = [];
        _rootEntity = null;
    }
};

neoengine.createEntity = function(parentEntity)
{
    if ((parentEntity === undefined) || (parentEntity === null))
    {
        parentEntity = _rootEntity;
    }

    if (parentEntity instanceof Entity)
    {
        return new Entity(parentEntity);
    }

    return null;
};

neoengine.destroyEntity = function(entity)
{
    if (entity instanceof Entity)
    {
        entity.destroy();
    }
};

neoengine.getRootEntity = function()
{
    return _rootEntity;
};
