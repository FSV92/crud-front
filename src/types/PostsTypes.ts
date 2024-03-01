export type PostModelType = {
  id: number;
  title: string;
  body: string;
  dates: Array<{ value: string }>;
  type: {
    target_id: number;
    target_type: string;
    target_uuid: string;
    url: string;
  };
  tags: Array<{
    target_id: number;
    target_type: string;
    target_uuid: string;
    url: string;
  }>;
};

export type ReceivedPostType = {
  nid: Array<{ value: number }>;
  title: Array<{ value: string }>;
  body: Array<{ value: string }>;
  field_klyuchevaya_data: Array<{ value: string }>;
  field_tip_sobytiya: Array<PostModelType["type"]>;
  field_tags: PostModelType["tags"];
};

export type TaxType = { tid: [{ value: number }]; name: [{ value: string }] };
export type SelectType = { id: number; value: string; label: string };

export type EditPostType = {
  title: { value: string };
  body: { value: string };
  type: [
    {
      target_id: "article";
    }
  ];
  field_tip_sobytiya: null | {
    target_id: number | string;
  };
  field_klyuchevaya_data: null | Array<{
    value: string;
  }>;
  field_tags: null | Array<{
    target_id: number | string;
  }>;
};
