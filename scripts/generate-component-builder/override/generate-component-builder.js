"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeComponentBuilder = exports.watchComponentBuilder = exports.generateComponentBuilder = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const component_builder_1 = require("./templates/component-builder");
const components_1 = require("@sitecore-content-sdk/core/tools");
const utils_1 = require("@sitecore-content-sdk/cli/dist/cjs/utils/watch-items.js");
// Default destination path for component builder
const defaultComponentBuilderOutputPath = 'src/temp/componentBuilder.ts';
const defaultComponentRootPath = 'src/components';
/**
 * Generate component builder based on provided settings
 * @param {Object} [settings] settings for component builder generation
 * @param {string} [settings.componentRootPath] path to components root
 * @param {string} [settings.componentBuilderOutputPath] path to component builder output
 * @param {PackageDefinition[]} [settings.packages] list of packages to include in component builder
 * @param {boolean} [settings.watch] whether to watch for changes to component builder sources
 */
function generateComponentBuilder({ componentRootPath = defaultComponentRootPath, componentBuilderOutputPath = defaultComponentBuilderOutputPath, packages = [], watch, } = {}) {
    if (watch) {
        watchComponentBuilder({ componentRootPath, componentBuilderOutputPath, packages });
    }
    else {
        writeComponentBuilder({ componentRootPath, componentBuilderOutputPath, packages });
    }
}
exports.generateComponentBuilder = generateComponentBuilder;
/**
 * Watch for changes to component builder sources
 * @param {Object} settings settings for component builder generation
 * @param {string} settings.componentRootPath path to components root
 * @param {string} settings.componentBuilderOutputPath path to component builder output
 * @param {PackageDefinition[]} settings.packages list of packages to include in component builder
 */
function watchComponentBuilder({ componentRootPath, componentBuilderOutputPath, packages, }) {
    console.log(`Watching for changes to component builder sources in ${componentRootPath}...`);
    (0, utils_1.watchItems)([componentRootPath], writeComponentBuilder.bind(null, { componentRootPath, componentBuilderOutputPath, packages }));
}
exports.watchComponentBuilder = watchComponentBuilder;
/**
 * Write component builder to file
 * @param {Object} settings settings for component builder generation
 * @param {string} settings.componentRootPath path to components root
 * @param {string} settings.componentBuilderOutputPath path to component builder output
 * @param {PackageDefinition[]} settings.packages list of packages to include in component builder
 */
function writeComponentBuilder({ componentRootPath, componentBuilderOutputPath, packages, }) {
    const components = (0, components_1.getComponentList)([componentRootPath]);
    components.unshift(...packages);
    const componentBuilderPath = path_1.default.resolve(componentBuilderOutputPath);
    const fileContent = (0, component_builder_1.getComponentBuilderTemplate)(components);
    console.log(`Writing component builder to ${componentBuilderPath}`);
    fs_1.default.writeFileSync(componentBuilderPath, fileContent, {
        encoding: 'utf8',
    });
}
exports.writeComponentBuilder = writeComponentBuilder;
