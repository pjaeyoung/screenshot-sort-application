import { GestureResponderEvent } from 'react-native';

// SORT화면에서 폴더 이미지와 스크린샷 이미지 겹침(충돌) 감지 유틸리티 함수
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

// 겹침(충돌) 여부 판단
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

// 겹침 크기, 기준값 계산
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

// 겹침 퍼센트 계산
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

// 겹침여부 판단 후 콜백 함수 실행
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

// FIXME: dropzone 데이터는 애니메이션 적용이 어려우므로 컴포넌트 자체를 넘기는 방향으로 바꾸기
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
    // 스크린샷 이미지(draggable) 위치값, 기준값 가져오기
    const { pageX, pageY, locationX, locationY } = event.nativeEvent;
    const draggable = {
      dimensions: {
        x: pageX - locationX,
        y: pageY - locationY,
        width: 100,
        height: 150,
      },
    };
    // 폴더 이미지들(dropzones)를 순회하여 겹침여부 확인
    // 겹침 시 실행할 cb 콜백함수 전달
    dropzones.forEach(dropzone => {
      onIntersect({ target: draggable, source: dropzone, minPercentage, cb });
    });
  };
}
