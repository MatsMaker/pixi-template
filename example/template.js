const rootContainer = pixiApplication.stage;
{;
   const Container_0 = new PIXI.Container();
   Container_0.name = 'nnn';
   rootContainer.addChild(Container_0);
};
{;
   const texture0 = PIXI.Texture.fromImage('assets/bunny.png');
   const Sprite_0 = new PIXI.Sprite(texture0);
   Sprite_0.name = 'bunny';
   Sprite_0.x = 50;
   Sprite_0.y = 50;
   rootContainer.addChild(Sprite_0);
};
