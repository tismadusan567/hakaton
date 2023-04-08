const map = {
    _id: new ObjectId("643197a020cdee3dcde47a50"),
    title: 'Cool first level',
    description: 'Easy first level for dummies',
    width: 10,
    height: 10,
    complicityRating: 4,
    userRating: 3,
    levelMap: [
      {
        type: 1,
        portalCoordinate: 3,
        _id: new ObjectId("643197a020cdee3dcde47a51")
      },
      {
        type: 1,
        portalCoordinate: 2,
        _id: new ObjectId("643197a020cdee3dcde47a52")
      }
    ],
    __v: 0
  }



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
        x: coords / width,
        y: coords % width
    }
}

const coordsToPos = (x, y) => {
    return x * width + y;
}

for(let i = 0;i < width * height;i++) {
    if (levelMap[i]['type'] == player) {
        currPos = i;
        break;
    }
}

const MoveToNode = (src, dest) => {
    if (dest.x < 0 || dest.x > height - 1 || dest.y < 0 || dest.y > width - 1) {
        return;
    }


    const destNode = levelMap[coordsToPos(dest.x, dest.y)];
    const destType = destNode['type'];

    let newPos = src;
    let type = -1;

    switch (destType) {
        case empty:
            finished = false;
            newPos = dest;
            type = walkCommand;
            break;
        case finish:
            finished = true;
            newPos = dest;
            type = walkCommand;
            break;
        case portal:
            finished = false;
            newPos = posToCoords(destNode['portal']);
            type = teleportCommand;
            break;
        default:
            finished = false;
            break;
    }

    if (newPos != src) {
        commandList.push({
            type: type,
            x: newPos.x,
            y: newPos.y
        });
        currPos = newPos;
    }

}

const MoveLeft = () => {
    const pos = posToCoords(currPos);
    moveToNode(pos, {
        x: pos.x,
        y: pos.y - 1
    });
}

const MoveRight = () => {
    const pos = posToCoords(currPos);
    moveToNode(pos, {
        x: pos.x,
        y: pos.y + 1
    });
}

const MoveUp = () => {
    const pos = posToCoords(currPos);
    moveToNode(pos, {
        x: pos.x - 1,
        y: pos.y
    });
}

const MoveDown = () => {
    const pos = posToCoords(currPos);
    moveToNode(pos, {
        x: pos.x + 1,
        y: pos.y - 1
    });
}

console.log(commandList);
console.log(finished);


