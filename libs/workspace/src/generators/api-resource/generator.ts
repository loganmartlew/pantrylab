import { formatFiles, generateFiles, Tree, updateJson } from '@nx/devkit';
import * as path from 'path';
import { ApiResourceGeneratorSchema } from './schema';

export async function apiResourceGenerator(
  tree: Tree,
  options: ApiResourceGeneratorSchema,
) {
  const name = options.name;
  const nameLowerPlural = name.charAt(0).toLowerCase() + name.slice(1);
  const nameLowerSingular = nameLowerPlural.slice(0, -1);
  const nameUpperPlural = name.charAt(0).toUpperCase() + name.slice(1);
  const nameUpperSingular = nameUpperPlural.slice(0, -1);

  const projectRoot = `libs/${nameLowerPlural}`;

  const templateOptions = {
    ...options,
    nameLowerPlural,
    nameLowerSingular,
    nameUpperPlural,
    nameUpperSingular,
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectRoot,
    templateOptions,
  );
  await formatFiles(tree);

  updateJson(tree, 'tsconfig.base.json', (json) => {
    json.compilerOptions.paths = {
      ...json.compilerOptions.paths,
      [`@pantrylab/${nameLowerPlural}`]: [
        `libs/${nameLowerPlural}/src/index.ts`,
      ],
    };

    return json;
  });
}

export default apiResourceGenerator;
