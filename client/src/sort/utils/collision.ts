import { GestureResponderEvent } from 'react-native';

interface DimensionsType {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface Dropzone {
  id: string;
  path: string;
  dimensions: DimensionsType;
}
interface IntersectionEvent {
  target: { dimensions: DimensionsType };
  source: Dropzone;
  minPercentage: number;
  cb: (dropzone: Dropzone) => void;
}

export function isCollided({
  targetDimensions,
  sourceDimensions,
}: {
  targetDimensions: DimensionsType;
  sourceDimensions: DimensionsType;
}) {
  return (
    targetDimensions.x < sourceDimensions.x + sourceDimensions.width &&
    targetDimensions.x + targetDimensions.width > sourceDimensions.x &&
    targetDimensions.y < sourceDimensions.y + sourceDimensions.height &&
    targetDimensions.y + targetDimensions.height > sourceDimensions.y
  );
}

export function getIntersection({
  targetDimensions,
  sourceDimensions,
}: {
  targetDimensions: DimensionsType;
  sourceDimensions: DimensionsType;
}) {
  const intersection = { x: 0, y: 0, width: 0, height: 0 };
  intersection.x = Math.max(targetDimensions.x, sourceDimensions.x);
  intersection.y = Math.max(targetDimensions.y, sourceDimensions.y);
  intersection.width =
    Math.min(
      targetDimensions.x + targetDimensions.width,
      sourceDimensions.x + sourceDimensions.width,
    ) - intersection.x;
  intersection.height =
    Math.min(
      targetDimensions.y + targetDimensions.height,
      sourceDimensions.y + sourceDimensions.height,
    ) - intersection.y;

  return intersection;
}

export function getIntersectionPercentage({
  intersectionDimensions,
  targetDimensions,
}: {
  intersectionDimensions: DimensionsType;
  targetDimensions: DimensionsType;
}) {
  return Math.ceil(
    ((intersectionDimensions.width * intersectionDimensions.height) /
      (targetDimensions.height * targetDimensions.width)) *
      100,
  );
}

export function onIntersect({ target, source, minPercentage, cb }: IntersectionEvent) {
  if (!isCollided({ targetDimensions: target.dimensions, sourceDimensions: source.dimensions }))
    return;

  if (
    getIntersectionPercentage({
      intersectionDimensions: getIntersection({
        targetDimensions: target.dimensions,
        sourceDimensions: source.dimensions,
      }),
      targetDimensions: target.dimensions,
    }) >= minPercentage
  ) {
    cb(source);
  }
}

export function onIntersectDropzones({
  dropzones,
  cb,
  minPercentage = 60,
}: {
  dropzones: Dropzone[];
  cb: (dropzone: Dropzone) => void;
  minPercentage?: number;
}) {
  return (event: GestureResponderEvent) => {
    const { pageX, pageY, locationX, locationY } = event.nativeEvent;
    const draggable = {
      dimensions: {
        x: pageX - locationX,
        y: pageY - locationY,
        width: 100,
        height: 150,
      },
    };

    dropzones.forEach(dropzone => {
      onIntersect({ target: draggable, source: dropzone, minPercentage, cb });
    });
  };
}
