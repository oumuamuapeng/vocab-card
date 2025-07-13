import { WordFamily } from '../types';

export const wordFamilies: WordFamily[] = [
  {
    id: 'ap',
    name: '-ap 词族',
    rime: 'ap',
    icon: 'fas fa-map',
    words: [
      {
        prefix: 'c',
        word: 'cap',
        icon: 'fas fa-hat-wizard',
        image: '/images/words/cap.jpg',
        phonetic: '/kæp/',
        meaning: '帽子',
        partOfSpeech: 'n.',
        examples: [
          {
            en: 'Tom wears a red cap.',
            zh: '汤姆戴着一顶红帽子。'
          },
          {
            en: 'She put the cap on her head.',
            zh: '她把帽子戴在头上。'
          },
          {
            en: 'The baseball cap is blue.',
            zh: '这顶棒球帽是蓝色的。'
          }
        ],
        relatedWords: ['hat', 'head', 'wear'],
        strokeOrder: [
          'M 10 50 Q 30 10 50 50', // c
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70', // a
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30' // p
        ]
      },
      {
        prefix: 'm',
        word: 'map',
        icon: 'fas fa-map-marked-alt',
        image: '/images/words/map.jpg',
        phonetic: '/mæp/',
        meaning: '地图',
        partOfSpeech: 'n.',
        examples: [
          {
            en: 'I need a map to find the way.',
            zh: '我需要一张地图来找路。'
          },
          {
            en: 'Can you show me on the map?',
            zh: '你能在地图上指给我看吗？'
          },
          {
            en: 'The treasure map leads to gold.',
            zh: '这张藏宝图通向黄金。'
          }
        ],
        relatedWords: ['atlas', 'guide', 'direction'],
        strokeOrder: [
          'M 10 30 L 30 70 L 50 30', // m
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70', // a
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30' // p
        ]
      }
    ]
  },
  {
    id: 'at',
    name: '-at 词族',
    rime: 'at',
    icon: 'fas fa-cat',
    words: [
      {
        prefix: 'c',
        word: 'cat',
        icon: 'fas fa-cat',
        image: '/images/words/cat.jpg',
        phonetic: '/kæt/',
        meaning: '猫',
        partOfSpeech: 'n.',
        examples: [
          {
            en: 'The cat is sleeping on the mat.',
            zh: '猫在垫子上睡觉。'
          },
          {
            en: 'My cat likes to chase mice.',
            zh: '我的猫喜欢追老鼠。'
          },
          {
            en: 'The black cat crossed the street.',
            zh: '那只黑猫穿过了马路。'
          }
        ],
        relatedWords: ['kitten', 'pet', 'animal'],
        strokeOrder: [
          'M 10 50 Q 30 10 50 50', // c
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70', // a
          'M 90 30 L 110 30 L 110 70' // t
        ]
      },
      {
        prefix: 'h',
        word: 'hat',
        icon: 'fas fa-hat-cowboy',
        image: '/images/words/hat.jpg',
        phonetic: '/hæt/',
        meaning: '帽子',
        partOfSpeech: 'n.',
        examples: [
          {
            en: 'She bought a new hat.',
            zh: '她买了一顶新帽子。'
          },
          {
            en: 'The sun hat is too big.',
            zh: '这顶太阳帽太大了。'
          },
          {
            en: 'He lost his winter hat.',
            zh: '他丢了他的冬天帽子。'
          }
        ],
        relatedWords: ['cap', 'hood', 'wear'],
        strokeOrder: [
          'M 10 30 L 10 70 L 50 70', // h
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70', // a
          'M 90 30 L 110 30 L 110 70' // t
        ]
      }
    ]
  }
]; 