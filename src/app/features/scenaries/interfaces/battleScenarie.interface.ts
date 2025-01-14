export interface BattleScenarie {
  type: string;
  description: string;
  probability_of_benefit: {
    type: string;
    value: number;
  };
  completed?: boolean;
}
