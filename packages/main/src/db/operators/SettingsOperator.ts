import { Settings } from '@main/db/entity/Settings';
import { DataSource, Repository } from 'typeorm';

export class SettingsOperator {
  Repository: Repository<Settings>;
  AppDataSource: DataSource;

  constructor(source: DataSource) {
    this.AppDataSource = source;
    this.Repository = this.AppDataSource.getRepository(Settings);
  }

  async getSettings(fields?: Array<keyof Settings>): Promise<Settings> {
    return await this.autoCreateDefault(fields);
  }

  async updateSettings<K extends keyof Settings>(field: K, value: Settings[K]): Promise<Settings> {
    await this.autoCreateDefault();

    const settings = (await this.Repository.findOne({ where: { id: 1 } })) as Settings;
    const updatedEntity = this.Repository.merge(settings, {
      [field]: value,
    });
    return this.Repository.save(updatedEntity);
  }

  async autoCreateDefault(fields?: Array<keyof Settings>): Promise<Settings> {
    let select = {};
    if (fields && fields.length > 0) {
      select = fields.reduce((select, field) => ({ ...select, [field]: true }), {});
    }
    const settings = await this.Repository.findOne({ where: { id: 1 }, select: select });
    return settings ? settings : await this.Repository.save(this.Repository.create({ id: 1 }));
  }
}
