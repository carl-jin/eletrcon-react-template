import { LogFormatEnum } from '@main/db/enums';

export type CommentsSetType = {
  header: string;
  comments: string[];
};

/**
 * 用户设置表格里面的配置
 */
export type SheetConfigSettings = {
  //  发帖追踪码
  destinationCodes: string[];
  //  帖文类型
  postTypes: string[];
  //  填表格式
  logFormat: LogFormatEnum[];
  //  填表链接
  logSheet: string;
  //  当前配置所属的 dz 名称
  personName: string;
  //  人员编码
  personCode: string;
  //  福音队编码
  gospelTeamCode: string;
  //  所属组名称
  groupName: string;
  //  个人发帖填表位置
  personLogSheet: string;
  //  个人养号填表位置
  maintenanceLogSheet: string;
  //  养号评论集
  maintenanceComments: CommentsSetType[];
  //  反派关键词
  maintenanceNegativeKeywords: string[];
};
