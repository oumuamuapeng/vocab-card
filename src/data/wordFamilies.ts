import { WordFamily } from '../types';

export const wordFamilies: WordFamily[] = [
  {
    id: 'ap',
    name: '-ap 词族',
    rime: 'ap',
    description: '探索-ap词族的神奇世界',
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
          { en: 'Tom wears a red cap.', zh: '汤姆戴着一顶红帽子。' },
          { en: 'She put the cap on her head.', zh: '她把帽子戴在头上。' },
          { en: 'The baseball cap is blue.', zh: '这顶棒球帽是蓝色的。' },
          { en: 'My cap fell off in the wind.', zh: '我的帽子被风吹掉了。' },
          { en: 'Dad bought me a new cap.', zh: '爸爸给我买了一顶新帽子。' }
        ],
        relatedWords: ['hat', 'head', 'wear', 'helmet', 'crown'],
        strokeOrder: [
          'M 10 50 Q 30 10 50 50',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30'
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
          { en: 'I need a map to find the way.', zh: '我需要一张地图来找路。' },
          { en: 'Can you show me on the map?', zh: '你能在地图上指给我看吗？' },
          { en: 'The treasure map leads to gold.', zh: '这张藏宝图通向黄金。' },
          { en: 'We studied the world map in class.', zh: '我们在课堂上学习了世界地图。' },
          { en: 'The map shows all the roads.', zh: '地图显示了所有的道路。' }
        ],
        relatedWords: ['atlas', 'guide', 'direction', 'compass', 'route'],
        strokeOrder: [
          'M 10 30 L 30 70 L 50 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30'
        ]
      },
      {
        prefix: 't',
        word: 'tap',
        icon: 'fas fa-hand-pointer',
        image: '/images/words/tap.jpg',
        phonetic: '/tæp/',
        meaning: '轻拍；水龙头',
        partOfSpeech: 'v./n.',
        examples: [
          { en: 'Tap the screen to start.', zh: '轻拍屏幕开始。' },
          { en: 'The water tap is broken.', zh: '水龙头坏了。' },
          { en: 'I heard a tap on the door.', zh: '我听到敲门声。' },
          { en: 'She tapped her foot to the music.', zh: '她跟着音乐踏脚。' },
          { en: 'Turn off the tap to save water.', zh: '关掉水龙头节约用水。' }
        ],
        relatedWords: ['touch', 'knock', 'faucet', 'click', 'press'],
        strokeOrder: [
          'M 90 30 L 110 30 L 110 70',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30'
        ]
      },
      {
        prefix: 'n',
        word: 'nap',
        icon: 'fas fa-bed',
        image: '/images/words/nap.jpg',
        phonetic: '/næp/',
        meaning: '小睡',
        partOfSpeech: 'n./v.',
        examples: [
          { en: 'Baby needs a nap.', zh: '宝宝需要小睡一会。' },
          { en: 'I took a short nap after lunch.', zh: '午饭后我小睡了一会。' },
          { en: 'Grandpa likes his afternoon nap.', zh: '爷爷喜欢午后小憩。' },
          { en: 'The cat is taking a nap in the sun.', zh: '猫正在阳光下小睡。' },
          { en: 'A quick nap helps me feel better.', zh: '快速小睡让我感觉更好。' }
        ],
        relatedWords: ['sleep', 'rest', 'doze', 'snooze', 'relax'],
        strokeOrder: [
          'M 10 30 L 30 70 L 50 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30'
        ]
      },
      {
        prefix: 'g',
        word: 'gap',
        icon: 'fas fa-arrows-alt-h',
        image: '/images/words/gap.jpg',
        phonetic: '/ɡæp/',
        meaning: '间隙；差距',
        partOfSpeech: 'n.',
        examples: [
          { en: 'There is a gap between the teeth.', zh: '牙齿之间有缝隙。' },
          { en: 'Mind the gap on the platform.', zh: '注意站台间隙。' },
          { en: 'We need to fill this gap.', zh: '我们需要填补这个空隙。' },
          { en: 'The age gap is not important.', zh: '年龄差距并不重要。' },
          { en: 'There is a gap in my knowledge.', zh: '我的知识有空白。' }
        ],
        relatedWords: ['space', 'hole', 'break', 'distance', 'opening'],
        strokeOrder: [
          'M 10 50 Q 30 10 50 50',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30'
        ]
      }
    ]
  },
  {
    id: 'at',
    name: '-at 词族',
    rime: 'at',
    description: '发现-at词族的奇妙之旅',
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
          { en: 'The cat is sleeping on the mat.', zh: '猫在垫子上睡觉。' },
          { en: 'My cat likes to chase mice.', zh: '我的猫喜欢追老鼠。' },
          { en: 'The black cat crossed the street.', zh: '那只黑猫穿过了马路。' },
          { en: 'Our cat purrs when happy.', zh: '我们的猫高兴时会呼噜。' },
          { en: 'The cat climbed up the tree.', zh: '猫爬上了树。' }
        ],
        relatedWords: ['kitten', 'pet', 'animal', 'feline', 'whiskers'],
        strokeOrder: [
          'M 10 50 Q 30 10 50 50',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 110 30 L 110 70'
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
          { en: 'She bought a new hat.', zh: '她买了一顶新帽子。' },
          { en: 'The sun hat is too big.', zh: '这顶太阳帽太大了。' },
          { en: 'He lost his winter hat.', zh: '他丢了他的冬天帽子。' },
          { en: 'The hat has colorful feathers.', zh: '帽子上有彩色羽毛。' },
          { en: 'Please take off your hat indoors.', zh: '请在室内脱帽。' }
        ],
        relatedWords: ['cap', 'hood', 'wear', 'head', 'fashion'],
        strokeOrder: [
          'M 10 30 L 10 70 L 50 70',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 110 30 L 110 70'
        ]
      },
      {
        prefix: 'r',
        word: 'rat',
        icon: 'fas fa-rat',
        image: '/images/words/rat.jpg',
        phonetic: '/ræt/',
        meaning: '老鼠',
        partOfSpeech: 'n.',
        examples: [
          { en: 'The rat ran into its hole.', zh: '老鼠跑进了洞里。' },
          { en: 'We set a trap for the rat.', zh: '我们为老鼠设了陷阱。' },
          { en: 'The rat ate the cheese.', zh: '老鼠吃了奶酪。' },
          { en: 'Rats are very smart animals.', zh: '老鼠是非常聪明的动物。' },
          { en: 'The white rat is a lab animal.', zh: '白鼠是实验动物。' }
        ],
        relatedWords: ['mouse', 'rodent', 'tail', 'cheese', 'small'],
        strokeOrder: [
          'M 10 30 L 30 50 L 50 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 110 30 L 110 70'
        ]
      },
      {
        prefix: 'b',
        word: 'bat',
        icon: 'fas fa-baseball-ball',
        image: '/images/words/bat.jpg',
        phonetic: '/bæt/',
        meaning: '球拍；蝙蝠',
        partOfSpeech: 'n.',
        examples: [
          { en: 'He swung the baseball bat.', zh: '他挥舞着棒球拍。' },
          { en: 'The bat flies at night.', zh: '蝙蝠在夜间飞行。' },
          { en: 'She bought a new tennis bat.', zh: '她买了一个新网球拍。' },
          { en: 'Bats hang upside down in caves.', zh: '蝙蝠在洞穴里倒挂着。' },
          { en: 'The wooden bat broke during the game.', zh: '木制球拍在比赛中断了。' }
        ],
        relatedWords: ['baseball', 'cricket', 'wing', 'night', 'cave'],
        strokeOrder: [
          'M 10 30 L 10 70 Q 30 70 30 50 Q 30 30 10 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 110 30 L 110 70'
        ]
      },
      {
        prefix: 'm',
        word: 'mat',
        icon: 'fas fa-square',
        image: '/images/words/mat.jpg',
        phonetic: '/mæt/',
        meaning: '垫子',
        partOfSpeech: 'n.',
        examples: [
          { en: 'Wipe your feet on the mat.', zh: '在垫子上擦脚。' },
          { en: 'The yoga mat is very comfortable.', zh: '瑜伽垫很舒服。' },
          { en: 'We sit on a picnic mat.', zh: '我们坐在野餐垫上。' },
          { en: 'The cat sleeps on the mat.', zh: '猫在垫子上睡觉。' },
          { en: 'Please roll up the exercise mat.', zh: '请卷起运动垫。' }
        ],
        relatedWords: ['rug', 'carpet', 'floor', 'soft', 'ground'],
        strokeOrder: [
          'M 10 30 L 30 70 L 50 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 110 30 L 110 70'
        ]
      }
    ]
  },
  {
    id: 'an',
    name: '-an 词族',
    rime: 'an',
    description: '体验-an词族的惊人魅力',
    icon: 'fas fa-user',
    words: [
      {
        prefix: 'm',
        word: 'man',
        icon: 'fas fa-user',
        image: '/images/words/man.jpg',
        phonetic: '/mæn/',
        meaning: '男人',
        partOfSpeech: 'n.',
        examples: [
          { en: 'The man is wearing a suit.', zh: '这个男人穿着西装。' },
          { en: 'A tall man walked by.', zh: '一个高个子男人走过。' },
          { en: 'The old man sits on the bench.', zh: '老人坐在长椅上。' },
          { en: 'Every man needs good friends.', zh: '每个人都需要好朋友。' },
          { en: 'The man works in an office.', zh: '这个男人在办公室工作。' }
        ],
        relatedWords: ['person', 'adult', 'human', 'gentleman', 'male'],
        strokeOrder: [
          'M 10 30 L 30 70 L 50 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 L 110 70'
        ]
      },
      {
        prefix: 'c',
        word: 'can',
        icon: 'fas fa-canning',
        image: '/images/words/can.jpg',
        phonetic: '/kæn/',
        meaning: '罐头；能够',
        partOfSpeech: 'n./modal v.',
        examples: [
          { en: 'I can swim very well.', zh: '我游泳游得很好。' },
          { en: 'Open the can of soup.', zh: '打开汤罐头。' },
          { en: 'Can you help me please?', zh: '你能帮助我吗？' },
          { en: 'The can is made of metal.', zh: '罐头是金属制的。' },
          { en: 'We can go to the park today.', zh: '我们今天可以去公园。' }
        ],
        relatedWords: ['able', 'possible', 'container', 'tin', 'bottle'],
        strokeOrder: [
          'M 10 50 Q 30 10 50 50',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 L 110 70'
        ]
      },
      {
        prefix: 'f',
        word: 'fan',
        icon: 'fas fa-fan',
        image: '/images/words/fan.jpg',
        phonetic: '/fæn/',
        meaning: '风扇；粉丝',
        partOfSpeech: 'n.',
        examples: [
          { en: 'Turn on the electric fan.', zh: '打开电风扇。' },
          { en: 'She is a big fan of music.', zh: '她是音乐的超级粉丝。' },
          { en: 'The fan keeps us cool.', zh: '风扇让我们保持凉爽。' },
          { en: 'I bought a new desk fan.', zh: '我买了一个新台扇。' },
          { en: 'The fans cheered loudly.', zh: '粉丝们大声欢呼。' }
        ],
        relatedWords: ['air', 'cool', 'supporter', 'admirer', 'breeze'],
        strokeOrder: [
          'M 10 30 L 10 70 L 30 50 L 10 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 L 110 70'
        ]
      },
      {
        prefix: 'p',
        word: 'pan',
        icon: 'fas fa-utensils',
        image: '/images/words/pan.jpg',
        phonetic: '/pæn/',
        meaning: '平底锅',
        partOfSpeech: 'n.',
        examples: [
          { en: 'Cook eggs in the frying pan.', zh: '在平底锅里煎鸡蛋。' },
          { en: 'The pan is very hot.', zh: '锅子很烫。' },
          { en: 'Wash the pan after cooking.', zh: '做饭后洗锅。' },
          { en: 'Mom bought a new non-stick pan.', zh: '妈妈买了一个新的不粘锅。' },
          { en: 'Heat oil in the pan first.', zh: '先在锅里热油。' }
        ],
        relatedWords: ['cook', 'kitchen', 'pot', 'fry', 'utensil'],
        strokeOrder: [
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 L 110 70'
        ]
      },
      {
        prefix: 'v',
        word: 'van',
        icon: 'fas fa-van-shuttle',
        image: '/images/words/van.jpg',
        phonetic: '/væn/',
        meaning: '面包车',
        partOfSpeech: 'n.',
        examples: [
          { en: 'The delivery van arrived.', zh: '送货车到了。' },
          { en: 'We traveled in a camping van.', zh: '我们乘坐野营车旅行。' },
          { en: 'The white van parked outside.', zh: '白色面包车停在外面。' },
          { en: 'Dad drives a work van.', zh: '爸爸开工作用车。' },
          { en: 'The van can carry many boxes.', zh: '面包车能装很多箱子。' }
        ],
        relatedWords: ['vehicle', 'truck', 'transport', 'drive', 'cargo'],
        strokeOrder: [
          'M 10 30 L 30 70 L 50 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 L 110 70'
        ]
      }
    ]
  },
  {
    id: 'ad',
    name: '-ad 词族',
    description: '了解-ad词族的独特魅力',
    rime: 'ad',
    icon: 'fas fa-frown',
    words: [
      {
        prefix: 's',
        word: 'sad',
        icon: 'fas fa-frown',
        image: '/images/words/sad.jpg',
        phonetic: '/sæd/',
        meaning: '悲伤的',
        partOfSpeech: 'adj.',
        examples: [
          { en: 'The little girl looks sad.', zh: '小女孩看起来很伤心。' },
          { en: 'I feel sad when it rains.', zh: '下雨时我感到悲伤。' },
          { en: 'The sad movie made me cry.', zh: '悲伤的电影让我哭了。' },
          { en: 'Don\'t be sad, things will get better.', zh: '别伤心，事情会好起来的。' },
          { en: 'The sad song reminds me of home.', zh: '悲伤的歌让我想起家。' }
        ],
        relatedWords: ['unhappy', 'upset', 'gloomy', 'blue', 'down'],
        strokeOrder: [
          'M 10 30 Q 30 30 50 50 Q 30 70 10 70',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30'
        ]
      },
      {
        prefix: 'b',
        word: 'bad',
        icon: 'fas fa-times-circle',
        image: '/images/words/bad.jpg',
        phonetic: '/bæd/',
        meaning: '坏的；糟糕的',
        partOfSpeech: 'adj.',
        examples: [
          { en: 'That\'s a bad idea.', zh: '那是个坏主意。' },
          { en: 'The weather is bad today.', zh: '今天天气很糟糕。' },
          { en: 'Eating too much candy is bad.', zh: '吃太多糖不好。' },
          { en: 'I had a bad dream last night.', zh: '昨晚我做了个噩梦。' },
          { en: 'The milk smells bad.', zh: '牛奶闻起来很臭。' }
        ],
        relatedWords: ['wrong', 'evil', 'poor', 'terrible', 'awful'],
        strokeOrder: [
          'M 10 30 L 10 70 Q 30 70 30 50 Q 30 30 10 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30'
        ]
      },
      {
        prefix: 'm',
        word: 'mad',
        icon: 'fas fa-angry',
        image: '/images/words/mad.jpg',
        phonetic: '/mæd/',
        meaning: '生气的；疯狂的',
        partOfSpeech: 'adj.',
        examples: [
          { en: 'Mom is mad at me.', zh: '妈妈对我生气了。' },
          { en: 'The dog went mad with joy.', zh: '狗狗高兴得发疯。' },
          { en: 'Don\'t make me mad!', zh: '别让我生气！' },
          { en: 'He\'s mad about football.', zh: '他对足球着迷。' },
          { en: 'She was mad with excitement.', zh: '她兴奋得发疯。' }
        ],
        relatedWords: ['angry', 'furious', 'crazy', 'insane', 'wild'],
        strokeOrder: [
          'M 10 30 L 30 70 L 50 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30'
        ]
      },
      {
        prefix: 'd',
        word: 'dad',
        icon: 'fas fa-user-tie',
        image: '/images/words/dad.jpg',
        phonetic: '/dæd/',
        meaning: '爸爸',
        partOfSpeech: 'n.',
        examples: [
          { en: 'Dad is reading a book.', zh: '爸爸在看书。' },
          { en: 'My dad works very hard.', zh: '我爸爸工作很努力。' },
          { en: 'Dad made breakfast for us.', zh: '爸爸为我们做了早餐。' },
          { en: 'I love my dad very much.', zh: '我非常爱我的爸爸。' },
          { en: 'Dad teaches me how to ride a bike.', zh: '爸爸教我骑自行车。' }
        ],
        relatedWords: ['father', 'papa', 'parent', 'family', 'daddy'],
        strokeOrder: [
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30'
        ]
      },
      {
        prefix: 'h',
        word: 'had',
        icon: 'fas fa-hand-holding',
        image: '/images/words/had.jpg',
        phonetic: '/hæd/',
        meaning: '有（have的过去式）',
        partOfSpeech: 'v.',
        examples: [
          { en: 'I had a good time yesterday.', zh: '我昨天玩得很开心。' },
          { en: 'We had lunch at noon.', zh: '我们中午吃了午饭。' },
          { en: 'She had a beautiful dress.', zh: '她有一条漂亮的裙子。' },
          { en: 'They had finished their homework.', zh: '他们已经完成了作业。' },
          { en: 'He had never seen snow before.', zh: '他以前从未见过雪。' }
        ],
        relatedWords: ['have', 'owned', 'possessed', 'got', 'held'],
        strokeOrder: [
          'M 10 30 L 10 70 L 50 70',
          'M 60 30 L 80 30 A 20 20 0 1 1 80 70 L 60 70',
          'M 90 30 L 90 70 Q 110 70 110 50 Q 110 30 90 30'
        ]
      }
    ]
  }
];