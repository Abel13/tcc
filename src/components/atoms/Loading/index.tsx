import React from 'react';
import {
  BounceLoader,
  ClipLoader,
  BarLoader,
  BeatLoader,
  CircleLoader,
  ClimbingBoxLoader,
  ClockLoader,
  DotLoader,
  FadeLoader,
  GridLoader,
  HashLoader,
  MoonLoader,
  PacmanLoader,
  PropagateLoader,
  PulseLoader,
  PuffLoader,
  RingLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SkewLoader,
  SquareLoader,
  SyncLoader,
} from 'react-spinners';
import Colors from '../../../styles/colors.json';
import { LoadingProps } from './interfaces';
import { Container, Text } from './styles';

const Loading: React.FC<LoadingProps> = ({
  showDescription,
  loading,
  size,
  type,
  color,
}) => {
  const getLoader = () => {
    let colorSelected = Colors.primary;
    switch (color) {
      case 'primary':
        colorSelected = Colors.primary;
        break;
      case 'text':
        colorSelected = Colors.white;
        break;
      default:
        colorSelected = Colors.primary;
        break;
    }

    switch (type) {
      case 'bounce':
        return (
          <BounceLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'clip':
        return (
          <ClipLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'bar':
        return <BarLoader color={colorSelected} loading={loading} />;
      case 'beat':
        return (
          <BeatLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'circle':
        return (
          <CircleLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'climbingBox':
        return (
          <ClimbingBoxLoader
            color={colorSelected}
            loading={loading}
            size={size}
          />
        );
      case 'clock':
        return (
          <ClockLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'dot':
        return (
          <DotLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'fade':
        return <FadeLoader color={colorSelected} loading={loading} />;
      case 'grid':
        return (
          <GridLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'hash':
        return (
          <HashLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'moon':
        return (
          <MoonLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'pacman':
        return (
          <PacmanLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'propagate':
        return (
          <PropagateLoader
            color={colorSelected}
            loading={loading}
            size={size}
          />
        );
      case 'pulse':
        return (
          <PulseLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'puff':
        return (
          <PuffLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'ring':
        return (
          <RingLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'rise':
        return (
          <RiseLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'rotate':
        return (
          <RotateLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'scale':
        return <ScaleLoader color={colorSelected} loading={loading} />;
      case 'skew':
        return (
          <SkewLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'square':
        return (
          <SquareLoader color={colorSelected} loading={loading} size={size} />
        );
      case 'sync':
        return (
          <SyncLoader color={colorSelected} loading={loading} size={size} />
        );
      default:
        return (
          <ClockLoader color={colorSelected} loading={loading} size={size} />
        );
    }
  };

  return (
    <Container>
      {getLoader()}
      {showDescription && loading && <Text color={color}>carregando...</Text>}
    </Container>
  );
};

export default Loading;
