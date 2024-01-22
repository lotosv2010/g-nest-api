import { Brackets, SelectQueryBuilder } from 'typeorm';

/**
 * 根据传入的选项参数生成数据库查询条件
 * @param queryBuilder 查询构建器
 * @param options 查询选项
 * @returns 查询构建器
 */
export const dbConditionForamt = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: Record<string, unknown>,
) => {
  for (const key in options) {
    const val = options[key];
    if (val) {
      // queryBuilder.andWhere(`${key} = :${key}`, { [key]: val }); // 如果值存在，则添加查询条件
      // 使用Brackets封装查询条件，以解决值不存在时的空值问题
      queryBuilder.andWhere(
        new Brackets((qb) =>
          val ? qb.where(`${key} = :${key}`, { [key]: val }) : qb,
        ),
      );
    }
  }
  return queryBuilder;
};
