'use strict';

const { platform } = (<any>window).require('process');
const { join } = (<any>window).electronRemote.require('path');
const root = (<any>window).electronRemote.require('app-root-dir');

let platformPath: string;
switch (platform) {
    case 'win32':
        platformPath = 'win/rg.exe';
        break;
    case 'linux':
        platformPath = 'linux/rg';
        break;
    case 'darwin':
        platformPath = 'mac/rg';
        break;
}
export const rgPath = join(root.get(), 'resources/bin/' + platformPath);
