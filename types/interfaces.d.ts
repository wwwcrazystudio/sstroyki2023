export interface Tag {
  label: string;
  type?: string;
}

export interface Images {
  'image/webp': string
  'image/jpeg': string
}

export interface ResponsiveImage {
  desktop: string
  mobile?: string
}

export interface ResponsiveImagesList {
  desktop?: string[]
  mob?: string[]
  path: string
  images?: string[]
}

export interface ComplexSingleRoom {
  room_id: string
  uuid: string
  actual: string
  house_id: string
  number: string
  article: string
  floor_number: string
  deadline: string
  rooms: string
  square: string
  floor: string
  floors: string
  housing: string
  entrance: string
  plan_room: string
  plan_floor: string
  plan_general: string
  finish_id: string
  lastfloor: string
  penthouse: string
  terrace: string
  height: string
  panorama: string
  chimney: string
  twolevel: string
  view: string
  description: string
  declaration: string
  date_update: string
  finish: string
  price: string
}

export interface ComplexRoomsData {
  square_min: string
  quantity: string
  price_min: string
  price_max: string
  array: ComplexSingleRoom[]
}

export interface ComplexMetroData {
  metro_station: string
  metroline_number: string
  metroline_name: string
  metroline_color: string
  type: 'walk' | 'bus'
  time: string
}

export interface ComplexData {
  house_id: string;
  actual: string;
  uuid: string;
  territory_id: string;
  developer_id: string;
  name: string;
  address: string;
  district: any;
  area: string;
  city: string;
  street: string;
  house: string;
  metro_station: string;
  metros: string;
  mkad?: any;
  mck_station?: any;
  mcd_station?: any;
  electro_station?: any;
  electro_time?: any;
  highway: string;
  class: string;
  room_type: string;
  housing_count: string;
  closed_yard: string;
  material: string;
  free_plan: string;
  parking: string;
  parking_type: string;
  floors?: any;
  status: string;
  longitude: string;
  latitude: string;
  q_0: string;
  s_0: string;
  min_0: string;
  max_0: string;
  q_1: string;
  s_1: string;
  min_1: string;
  max_1: string;
  q_2: string;
  s_2: string;
  min_2: string;
  max_2: string;
  q_3: string;
  s_3: string;
  min_3: string;
  max_3: string;
  q_4: string;
  s_4: string;
  min_4: string;
  max_4: string;
  description?: any;
  documents?: any;
  sale?: any;
  date_update: string;
  developer_description: string
  developer_id: string
  developer_phone: string
  developer_title: string
  developer_images: Images;
  developer_url: string
  rooms: ComplexRoomsData[]
  description: string
  roomtype: string
  material: string
  metro_info: ComplexMetroData[]
  image_main: ResponsiveImagesList
  image_details: ResponsiveImagesList
  image_other: ResponsiveImagesList
  finish_title: string
  finish_description: string
  finish_images: ResponsiveImagesList
  price_date_update: string
}

export interface Route {
    label: string;
    url?: string;
}


export interface DeveloperData {
  developer_id: string
  title: string
  developer_images: ResponsiveImagesList
  slogan: string
  description: string
  houses_processing: string
  total_processing: string
  houses_complete: string
  total_complete: string
  percent: string
  phone: string
  meta_title: string
  meta_h1: string
  meta_description: string
  meta_keywords: string
  houses: ComplexData[]
}