interface Athlete {
  id: number;
  resource_state: number;
}

interface Map {
  id: string;
  polyline: string;
  resource_state: number;
  summary_polyline: string;
}

interface Segment {
  id: number;
  resource_state: number;
  name: string;
  activity_type: string;
  distance: number;
  average_grade: number;
  maximum_grade: number;
  elevation_high: number;
  elevation_low: number;
  start_latlng: [number, number];
  end_latlng: [number, number];
  elevation_profile: any; // Replace 'any' with the correct type if available
  climb_category: number;
  city: string;
  state: string | null;
  country: string;
  private: boolean;
  hazardous: boolean;
  starred: boolean;
}

interface Split {
  distance: number;
  elapsed_time: number;
  elevation_difference: number;
  moving_time: number;
  split: number;
  average_speed: number;
  average_grade_adjusted_speed: number;
  average_heartrate: number;
  pace_zone: number;
}

interface Lap {
  id: number;
  resource_state: number;
  name: string;
  activity: {
    id: number;
    resource_state: number;
  };
  athlete: Athlete;
  elapsed_time: number;
  moving_time: number;
  start_date: string;
  start_date_local: string;
  distance: number;
  start_index: number;
  end_index: number;
  total_elevation_gain: number;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  device_watts: boolean;
  average_heartrate: number;
  max_heartrate: number;
  lap_index: number;
  split: number;
  pace_zone: number;
}

interface BestEffort {
  id: number;
  resource_state: number;
  name: string;
  activity: {
    id: number;
    resource_state: number;
  };
  athlete: Athlete;
  elapsed_time: number;
  moving_time: number;
  start_date: string;
  start_date_local: string;
  distance: number;
  start_index: number;
  end_index: number;
  pr_rank: number | null;
  achievements: any[]; // Replace 'any' with the correct type if available
}

export interface DetailedActivity {
  resource_state: number;
  athlete: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: number;
  id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  location_city: string | null;
  location_state: string | null;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: number | null;
  start_latlng: [number, number];
  end_latlng: [number, number];
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  upload_id: number;
  upload_id_str: string;
  external_id: string;
  from_accepted_tag: boolean;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
  description: string;
  calories: number;
  perceived_exertion: any; // Replace 'any' with the correct type if available
  prefer_perceived_exertion: boolean;
  segment_efforts: Segment[];
  splits_metric: Split[];
  splits_standard: Split[];
  laps: Lap[];
  best_efforts: BestEffort[];
}
