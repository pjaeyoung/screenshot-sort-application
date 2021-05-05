import { LayoutRectangle, GestureResponderEvent } from 'react-native';

interface Dimensions {
  x: number;
  y: number;
  height: number;
  width: number;
}

interface IntersectionEvent {
  target: Dimensions;
  source: Dimensions;
  minPercentage: number;
  cb: () => void;
}

export function isCollided({ target, source }: { target: Dimensions; source: Dimensions }) {
  return (
    target.x < source.x + source.width &&
    target.x + target.width > source.x &&
    target.y < source.y + source.height &&
    target.y + target.height > source.y
  );
}

export function getIntersection({ target, source }: { target: Dimensions; source: Dimensions }) {
  const intersection = { x: 0, y: 0, width: 0, height: 0 };
  intersection.x = Math.max(target.x, source.x);
  intersection.y = Math.max(target.y, source.y);
  intersection.width = Math.min(target.x + target.width, source.x + source.width) - intersection.x;
  intersection.height =
    Math.min(target.y + target.height, source.y + source.height) - intersection.y;

  return intersection;
}

export function getIntersectionPercentage({
  intersection,
  target,
}: {
  intersection: Dimensions;
  target: Dimensions;
}) {
  return Math.ceil(
    ((intersection.width * intersection.height) / (target.height * target.width)) * 100,
  );
}

export function onIntersect({ target, source, minPercentage, cb }: IntersectionEvent) {
  if (!isCollided({ target, source })) return;

  if (
    getIntersectionPercentage({ intersection: getIntersection({ target, source }), target }) >=
    minPercentage
  ) {
    cb();
  }
}

export function onIntersectDropzones({
  dropzoneDimensions,
  cb,
  minPercentage = 60,
}: {
  dropzoneDimensions: LayoutRectangle[];
  cb: () => void;
  minPercentage?: number;
}) {
  return (event: GestureResponderEvent) => {
    const { pageX, pageY, locationX, locationY } = event.nativeEvent;
    const draggable = {
      x: pageX - locationX,
      y: pageY - locationY,
      width: 100,
      height: 150,
    };

    dropzoneDimensions.forEach(dropzone => {
      onIntersect({ target: draggable, source: dropzone, minPercentage, cb });
    });
  };
}
