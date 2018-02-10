const fs = require('fs');
const { basename, join } = require('path');
const distance = require('./distance');

module.exports = function xs(query) {
    const root = process.cwd();
    if (query === undefined) {
        return {
            query: query,
            distance: 0,
            path: root,
            folders: getDirectories(root),
            files: getFiles(root)
        }
    }
    const partialPaths = query.split(' ');
    const res = getScoredDirectoryTree(root, partialPaths.slice(0));
    const sumRes = sumScoredDirectoryTree(res, partialPaths.length-1).sort();
    if (sumRes.length === 0) {
        return undefined;
    }
    const best = sumRes[0];
    const path = best.path+'/'+best.name;
    return {
            query: query,
            distance: best.distance,
            path: path,
            folders: getDirectories(path),
            files: getFiles(path)
        }
}

const sumScoredDirectoryTree = (tree, targetDepth, parentDistance=0) => {
    return tree.reduce((res, t) => {
        if (t.children.length === 0 && t.depth === targetDepth) {
            return [...res, {
                path: t.path,
                name: t.name,
                distance: t.distance + parentDistance
            }];
        }
        return [...res, ...sumScoredDirectoryTree(t.children, targetDepth, t.distance + parentDistance)];
    }, []);
};

const getScoredDirectoryTree = (path, partialPaths, depth=0) =>
    partialPaths.length === 0
        ? []
        : getScoredDirectories(path, partialPaths[0]).map(dir => ({
            path: path,
            name: dir.name,
            distance: dir.distance,
            depth: depth,
            children: getScoredDirectoryTree(path+'/'+dir.name, partialPaths.slice(1), depth+1)
        }));

const getScoredDirectories = (thisPath, partialNextPath) => 
    getDirectories(thisPath)
        .map(d => ({ distance: distance(partialNextPath, d), name: d}))
        .sort((a, b) => a.distance > b.distance);

const isDirectory = source => 
    fs.lstatSync(source)
        .isDirectory();

const getDirectories = source => 
    fs.readdirSync(source)
        .map(name => join(source, name))
        .filter(isDirectory)
        .map(p => basename(p));

const getFiles = source => 
    fs.readdirSync(source)
        .map(name => join(source, name))
        .filter(source => !isDirectory(source))
        .map(p => basename(p));