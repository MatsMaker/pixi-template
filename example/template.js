const rootContainer = pixiApplication.stage;
{;
   const cobalt_0 = new PIXI.Container();
   {;
      const texture0 = PIXI.Texture.fromImage('assets/bunny.png');
      const cobaltBunny1_0 = new PIXI.Sprite(texture0);
      cobaltBunny1_0['name'] = 'cobaltBunny1';
      cobaltBunny1_0['x'] = 150;
      cobaltBunny1_0['y'] = 90;
      cobalt_0.addChild(cobaltBunny1_0);
   };
   {;
      const texture0 = PIXI.Texture.fromImage('assets/bunny.png');
      const cobaltBunny2_0 = new PIXI.Sprite(texture0);
      cobaltBunny2_0['name'] = 'cobaltBunny2';
      cobaltBunny2_0['x'] = 50;
      cobaltBunny2_0['y'] = 50;
      cobalt_0.addChild(cobaltBunny2_0);
   };
   {;
      const subcontainer_0 = new PIXI.Container();
      {;
         const texture0 = PIXI.Texture.fromImage('assets/bunny.png');
         const bunny1_0 = new PIXI.Sprite(texture0);
         bunny1_0['name'] = 'bunny1';
         bunny1_0['x'] = 300;
         bunny1_0['y'] = 250;
         subcontainer_0.addChild(bunny1_0);
      };
      subcontainer_0['name'] = 'subcontainer';
      cobalt_0.addChild(subcontainer_0);
   };
   cobalt_0['name'] = 'cobalt';
   rootContainer.addChild(cobalt_0);
};
{;
   const texture0 = PIXI.Texture.fromImage('assets/bunny.png');
   const freeBunny_0 = new PIXI.Sprite(texture0);
   freeBunny_0['name'] = 'freeBunny';
   freeBunny_0['x'] = 450;
   freeBunny_0['y'] = 80;
   rootContainer.addChild(freeBunny_0);
};
