// 使用接口而非类型别名
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 使用 Map 替代枚举
export const StatusMap = new Map([
  ['active', '活跃'],
  ['inactive', '不活跃'],
  ['pending', '待处理']
]); 