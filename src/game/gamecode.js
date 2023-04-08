const empty = 0;
const obstacle = 1;
const player = 2;
const portal = 3;
const finish = 4;

const walkCommand = 0;
const teleportCommand = 1;

const width = map['width'];
const height = map['height'];
const levelMap = map['levelMap'];

let currPos = -1;

const commandList = [];
let finished = false;

const posToCoords = (coords) => {
    return {
        x: Math.floor(coords / width),
        y: coords % width
    }
};

const coordsToPos = (x, y) => {
    return x * width + y;
};

for(let i = 0;i < width * height;i++) {
    if (levelMap[i]['type'] == player) {
        currPos = i;
        break;
    }
};

const MoveToNode = (src, dest) => {
    console.log(src);
    console.log(dest);
    if (dest.x < 0 || dest.x > height - 1 || dest.y < 0 || dest.y > width - 1) {
        return;
    }


    const destNode = levelMap[coordsToPos(dest.x, dest.y)];
    const destType = destNode['type'];

    let newCoords = src;
    let type = -1;

    switch (destType) {
        case empty:
            finished = false;
            newCoords = dest;
            type = walkCommand;
            break;
        case finish:
            finished = true;
            newCoords = dest;
            type = walkCommand;
            break;
        case portal:
            finished = false;
            newCoords = posToCoords(destNode['portalCoordinate']);
            type = teleportCommand;
            break;
    }

    if (newCoords != src) {
        commandList.push({
            type: type,
            x: newCoords.x,
            y: newCoords.y
        });
        currPos = coordsToPos(newCoords.x, newCoords.y);
    }

    console.log(newCoords);
    console.log(currPos);
    console.log('----------------------');

};

const MoveLeft = () => {
    const pos = posToCoords(currPos);
    MoveToNode(pos, {
        x: pos.x,
        y: pos.y - 1
    });
};

const MoveRight = () => {
    const pos = posToCoords(currPos);
    MoveToNode(pos, {
        x: pos.x,
        y: pos.y + 1
    });
};

const MoveUp = () => {
    const pos = posToCoords(currPos);
    MoveToNode(pos, {
        x: pos.x - 1,
        y: pos.y
    });
};

const MoveDown = () => {
    const pos = posToCoords(currPos);
    MoveToNode(pos, {
        x: pos.x + 1,
        y: pos.y
    });
}; 
