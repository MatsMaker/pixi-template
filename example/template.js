const rootContainer = pixiApplication.stage;
{;
   const bunny = PIXI.Texture.fromImage('assets/bunny.png');
   const SPRITE_0 = new PIXI.Sprite(bunny);
   SPRITE_0.name = 'bunny';
   SPRITE_0.x = 50;
   SPRITE_0.y = 50;
   rootContainer.addChild(SPRITE_0);
};
