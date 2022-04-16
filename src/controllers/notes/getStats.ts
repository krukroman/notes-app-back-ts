import { Request, Response, NextFunction } from 'express';
import { Note } from '../../models/note';

interface IStatsFromDb {
  _id: string;
  isArchived: boolean[];
}

interface IStatistics {
  category: string;
  active: number | string;
  archived: number | string;
}

const getActiveNotesCount = (arr: boolean[]) => {
  return arr.filter(el => !el).length;
};

const getArchivedNotesCount = (arr: boolean[]) => {
  return arr.filter(el => el).length;
};

const getStats = async (req: Request, res: Response, next: NextFunction) => {
  const statistics: IStatistics[] = [];
  try {
    const data: IStatsFromDb[] = await Note.aggregate([
      {
        $group: {
          _id: '$category',
          isArchived: {
            $push: '$archived'
          }
        }
      }
    ]);

    data.forEach(el => {
      const stats: IStatistics = {
        category: el._id,
        active: getActiveNotesCount(el.isArchived),
        archived: getArchivedNotesCount(el.isArchived)
      };
      statistics.push(stats);
    });

    res.json(statistics);
  } catch (error) {
    next(error);
  }
};

export default getStats;
