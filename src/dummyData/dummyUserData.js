import swordImg from "../assets/img/sword.jpg";

const dummyUser = {
  id: 101,
  username: "KnightRider",
  servers: [
    {
      id: "1",
      name: "Guild One",
      category: "MMORPG",
      iconUrl: null,
      hasNewMessages: true,
      channels: [
        { id: "1-1", name: "general" },
        { id: "1-2", name: "events" },
        { id: "1-3", name: "lfg" },
      ],
      users: [
        { id: 201, username: "MageQueen" },
        { id: 202, username: "TankLord" },
      ],
      messages: {
        "1-1": [
          { id: 1, user: "KnightRider", text: "Welcome to the guild!" },
          { id: 2, user: "MageQueen", text: "Hey everyone!" },
        ],
        "1-2": [{ id: 3, user: "TankLord", text: "Next raid 8pm server time" }],
      },
    },
    {
      id: "2",
      name: "Raiders HQ",
      category: "Battle Royale",
      iconUrl: swordImg,
      hasNewMessages: false,
      channels: [
        { id: "2-1", name: "matchmaking" },
        { id: "2-2", name: "clips" },
      ],
      users: [
        { id: 203, username: "SniperWolf" },
        { id: 204, username: "GrenadeGuru" },
      ],
      messages: {
        "2-1": [{ id: 4, user: "SniperWolf", text: "Looking for duo partner" }],
        "2-2": [
          { id: 5, user: "GrenadeGuru", text: "Check this 360 no scope!" },
        ],
      },
    },
    {
      id: "3",
      name: "PvP Arena",
      category: "MOBA",
      iconUrl: null,
      hasNewMessages: false,
      channels: [
        { id: "3-1", name: "strategy" },
        { id: "3-2", name: "ranked" },
      ],
      users: [
        { id: 205, username: "ADCMain" },
        { id: 206, username: "Support4Life" },
      ],
      messages: {
        "3-1": [{ id: 6, user: "ADCMain", text: "Split push meta is back!" }],
      },
    },
    {
      id: "4",
      name: "Fantasy Tavern",
      category: "RPG",
      iconUrl: null,
      hasNewMessages: true,
      channels: [
        { id: "4-1", name: "story-discussion" },
        { id: "4-2", name: "game-mods" },
      ],
      users: [
        { id: 207, username: "StoryTeller" },
        { id: 208, username: "ModderMax" },
      ],
      messages: {
        "4-1": [{ id: 7, user: "StoryTeller", text: "Chapter 3 leaks?" }],
      },
    },
    {
      id: "5",
      name: "Quick Play",
      category: "FPS",
      iconUrl: null,
      hasNewMessages: false,
      channels: [
        { id: "5-1", name: "loadouts" },
        { id: "5-2", name: "kills-feed" },
      ],
      users: [
        { id: 209, username: "QuickScope" },
        { id: 210, username: "HeadshotKing" },
      ],
      messages: {
        "5-2": [{ id: 8, user: "QuickScope", text: "5 kill streak 💥" }],
      },
    },
  ],
};

export default dummyUser;
