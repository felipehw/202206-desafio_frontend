interface ColorVariables { 
	customSpanishGray: string,
	customLotion: string,
	customAliceBlue: string,
	customLightCyan: string,
	customMaximumBlueGreen: string,
	customBrightGray: string,
};
const variables: ColorVariables;

export {
	ColorVariables, // "export" is optional but allows to explicitily import the Interface (e.g.: `import {type ColorVariables} from './variables.module.scss';`
};

export default variables;