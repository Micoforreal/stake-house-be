import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MongoClient, Db } from 'mongodb';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MatchService implements OnModuleInit {
  constructor(
    @Inject('DATABASE_CONNECTION') private db: Db,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.db
      .collection('football')
      .createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 });
    console.log('TTL index created on "match" collection');
  }

  async create(data: any) {
    return this.db.collection('football').insertOne(data);
  }

  async findAll(category?: 'football' | 'basketball') {
    if (category) {
      const match = await this.db.collection(category).find().toArray();

      const date = new Date();
      const formattedDate = new Intl.DateTimeFormat('en-CA').format(date);

      if (match.length < 1) {
        const config = {
          method: 'get',
          url: `https://v3.football.api-sports.io/fixtures?date=${formattedDate}`,
          headers: {
            'x-rapidapi-key':
              this.configService.get<string>('FOOTBALL_API_KEY'),
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        };
        try {
          const res = await axios(config);
          const dbResponse = await this.db.collection(category).insertOne({
            data: res.data,
            createdAt: new Date(),
          });

          const insertedDocument = await this.db
            .collection(category)
            .findOne({ _id: dbResponse.insertedId });

          return insertedDocument;
        } catch (error) {
          throw new Error(error);
        }
      }

      return match;
    }

    return 'enter category';
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
