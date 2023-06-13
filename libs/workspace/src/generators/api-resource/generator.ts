import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { ApiResourceGeneratorSchema } from './schema';

export async function apiResourceGenerator(
  tree: Tree,
  options: ApiResourceGeneratorSchema
) {
  const name = options.name;
  const nameLowerPlural = name.charAt(0).toLowerCase() + name.slice(1);
  const nameLowerSingular = nameLowerPlural.slice(0, -1);
  const nameUpperPlural = name.charAt(0).toUpperCase() + name.slice(1);
  const nameUpperSingular = nameUpperPlural.slice(0, -1);

  const projectRoot = `apps/${options.project}/src/${nameLowerPlural}`;

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
    templateOptions
  );
  await formatFiles(tree);
}

export default apiResourceGenerator;
