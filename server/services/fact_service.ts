import { Fact } from '../model/FunFact';

export const getAllFacts = async () => {
  return Fact.findAll();
};

export const getFact = async (factId: number) => {
  return Fact.findOne({
    where: { factId },
  });
};

export const saveFact = async (fact: Fact) => {
  return Fact.create<Fact>(fact);
};

export const updateFact = async (factId: number, fact: Fact) => {
  return Fact.update(fact, {
    where: {
      factId,
    },
  });
};

export const deleteFact = async (factId: number) => {
  return Fact.destroy({
    where: {
      factId,
    },
  });
};
