import fs from 'fs';
import path from 'path';

export default function getStylesheetFromStaticFolder(distDirectoryPath: string): string | null {

  //vite-plugin-ssr builds folder /dist-ssr/assets/static
  const pathToStaticAssets: string = path.join(distDirectoryPath, 'assets', 'static');

  const files: string[] = fs.readdirSync(pathToStaticAssets);
  const cssFiles: string[] = files.filter((file: string) => path.extname(file) === '.css');

  if (cssFiles.length > 0) {
    const cssFilePath: string = path.join(pathToStaticAssets, cssFiles[0]);
    const styleSheet: string = fs.readFileSync(cssFilePath, 'utf-8');
    return styleSheet;
  }
  return null;
}
