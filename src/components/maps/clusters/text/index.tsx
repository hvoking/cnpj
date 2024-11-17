// Third party imports
import type { LayerProps } from 'react-map-gl';

export const createText = (source: string): LayerProps => ({
  id: `${source}-cluster-count`,
  type: 'symbol',
  source: `${source}-clusters`,
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-size': 12
  }
});