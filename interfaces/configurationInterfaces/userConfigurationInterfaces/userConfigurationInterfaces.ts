export interface IUserLoginDataset {
  email: string;
  password: string;
}

// export interface ICommonMenu {
//   type: "group";
//   id?: number;
//   parent_menu_id?: number | null;
//   title?: string;
//   label?: string;
//   is_first_level?: boolean;
//   is_second_level?: boolean;
//   is_third_level?: boolean;
//   path?: string;
//   has_sub_menu?: boolean;
//   is_active?: boolean;
//   children: ICommonMenu[];
// }

// interface ISecondLevelMenu extends ICommonMenu {
//   third_level_menu?: ICommonMenu[];
// }

// export interface IMenu extends ICommonMenu {
//   second_level_menu?: ISecondLevelMenu[];
// }
