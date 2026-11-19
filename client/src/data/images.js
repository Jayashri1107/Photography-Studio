// The image library. Replace `unsplash` ids with the studio's own photos
// (or add a `cloudinary` public id) — every page reads from here.
// `shape`: tall | wide | square — used by the masonry gallery.
const I = (unsplash, alt, shape = 'tall') => ({ unsplash, alt, shape });

export const images = {
  // Wedding
  weddingCanopy: I('photo-1587271636175-90d58cdad458', 'Bride and groom in traditional attire seated under a floral mandap', 'wide', 'wide'),
  weddingRiver: I('photo-1630526720753-aa4e71acf67d', 'Indian wedding couple standing together on a rock beside a river', 'tall'),
  brideRed: I('photo-1610173827043-9db50e0d8ef9', 'Bride in a red lehenga with gold jewellery and mehendi', 'tall'),
  hennaHands: I('photo-1621801306185-8c0ccf9c8eb8', 'Bride and groom holding hands, the bride’s hands covered in henna', 'square', 'wide'),
  weddingRitual: I('photo-1587271407850-8d438ca9fdf2', 'Couple performing a wedding ritual under a floral canopy', 'wide', 'wide'),
  brideJewels: I('photo-1600685890506-593fdf55949b', 'Close portrait of a bride in red bridal attire with ornate gold jewellery', 'tall'),
  sherwaniKiss: I('photo-1599462616558-2b75fd26a283', 'Groom in a white sherwani kissing his bride in red', 'tall'),
  brideGold: I('photo-1654764746225-e63f5e90facd', 'Bride in a red and gold bridal outfit', 'tall'),
  bridePosing: I('photo-1722952934708-749c22eb2e58', 'Bride and groom posing together on their wedding day', 'tall'),
  weddingFlorals: I('photo-1783188223242-07c15cabbf18', 'Traditional Indian wedding attire among floral decorations', 'square', 'square'),
  weddingAttire: I('photo-1665960213508-48f07086d49c', 'Couple in traditional Indian wedding attire', 'tall'),
  ringHands: I('photo-1542042161784-26ab9e041e89', 'Couple holding hands showing a gold ring', 'wide', 'wide'),

  // Pre-wedding
  coupleSmile: I('photo-1779475559689-a19f9c339352', 'Smiling couple in traditional Indian attire', 'tall'),
  coupleBoat: I('photo-1774814319627-6b105a4dbf03', 'Couple sitting together on a boat at sunset', 'wide', 'tall'),
  coupleOutdoors: I('photo-1774814328175-86c1ed4949e6', 'Couple laughing outdoors in traditional clothes', 'tall'),
  coupleStairs: I('photo-1767790693955-bb886f16dce9', 'Couple in traditional attire walking down stone steps', 'tall'),
  coupleSilhouette: I('photo-1591969851586-adbbd4accf81', 'Silhouette of a couple embracing against golden light', 'wide', 'tall'),
  coupleBeach: I('photo-1615966650071-855b15f29ad1', 'Couple dancing on a beach at golden hour', 'wide', 'wide'),
  coupleWoods: I('photo-1735052712464-9d24b69be5f5', 'Couple standing on a forest path', 'tall'),
  coupleBoatClose: I('photo-1774814318501-b978efc6fb98', 'Couple sitting close together on a wooden boat', 'square', 'square'),

  // Maternity
  maternityGreen: I('photo-1568043625493-2b0633c7c491', 'Expectant mother in a green dress cradling her bump', 'wide'),
  maternityLace: I('photo-1538678867871-8a43e7487746', 'Expectant mother in a striped dress and lace cardigan', 'tall'),
  maternityStudio: I('photo-1710897869625-feacd81ed629', 'Expectant mother in a studio maternity portrait', 'tall'),
  maternityMono: I('photo-1710897872898-3bc4353682ce', 'Black and white maternity portrait', 'square', 'square'),
  maternityHold: I('photo-1493101670003-a9c7db5858b2', 'Expectant mother holding her bump with both hands', 'wide', 'wide'),
  maternityGarden: I('photo-1495345771350-5f3374c052f3', 'Expectant mother standing among green plants', 'wide'),

  // Newborn
  newbornHands: I('photo-1780329930345-19a7f25e5fc6', 'Newborn baby cradled in hands on a patterned blanket', 'wide', 'tall'),
  newbornCap: I('photo-1604917621956-10dfa7cce2e7', 'Sleeping newborn in a white knit cap', 'square', 'square'),
  babyEyes: I('photo-1780329939164-cc0e146f833d', 'Baby with dark hair and wide curious eyes', 'tall'),
  babyLooking: I('photo-1630305131239-c8df91783f10', 'Baby with dark hair looking upward', 'tall'),
  newbornBlanket: I('photo-1566004100631-35d015d6a491', 'Newborn wrapped under a soft purple blanket', 'wide', 'wide'),
  babyCurious: I('photo-1780329904651-1df56b304c0d', 'Baby looking up with curious eyes', 'square', 'wide'),

  // Birthday & events
  mehendiParty: I('photo-1514178703120-3fa66528901d', 'Women showing their mehendi designs at a celebration', 'wide', 'tall'),
  birthdayCake: I('photo-1639376710313-683c2d4d0104', 'Woman holding a birthday cake with lit candles', 'wide'),
  haldiCrowd: I('photo-1645856052484-2e5506e20942', 'Guests dressed in yellow and orange at a celebration', 'wide', 'wide'),
  birthdayGirl: I('photo-1597294150753-b6e790b68d1c', 'Young girl in a festive yellow and red dress', 'wide'),
  canopyCelebration: I('photo-1711301633355-d10a31380c44', 'Crowd celebrating under a colourful canopy', 'wide', 'wide'),
  balloonCake: I('photo-1517398741578-fc1e1a3c6c1b', 'Birthday cake beside a yellow balloon', 'square', 'wide'),

  // Portrait
  portraitScarf: I('photo-1536766768598-e09213fdcf22', 'Portrait of a woman in a brown headscarf', 'tall'),
  portraitTurban: I('photo-1535270732370-dd3188bab1da', 'Portrait of a man wearing a turban', 'tall'),
  portraitElder: I('photo-1782289819142-a4232301521a', 'Close portrait of an elderly woman with a bindi and nose ring', 'square', 'wide'),
  portraitRedWall: I('photo-1516022531723-ed0d24058337', 'Woman seated beside a red painted wall', 'wide'),
  portraitSari: I('photo-1617627143750-d86bc21e42bb', 'Woman in a pink and orange sari with gold jewellery', 'tall'),
  portraitMan: I('photo-1607346256330-dee7af15f7c5', 'Professional portrait of a man in a dark jacket', 'wide'),

  // Fashion & commercial
  fashionSari: I('photo-1619516388835-2b60acc4049e', 'Model in a red and white sari among green trees', 'tall'),
  fashionGowns: I('photo-1756483509254-3cc48a5a15b2', 'Two models in ornate gowns against a muted backdrop', 'wide', 'tall'),
  fashionBlue: I('photo-1610202631408-fa6ba0f39ca3', 'Model in a blue and gold floral outfit', 'tall'),
  fashionBrown: I('photo-1571908599407-cdb918ed83bf', 'Model in a brown long-sleeved dress', 'tall'),
  fashionRedGold: I('photo-1610047614301-13c63f00c032', 'Model in a red and gold sari', 'square', 'square'),
  fashionGreen: I('photo-1619715613791-89d35b51ff81', 'Model in a green dress seated on a concrete bench', 'tall'),

  // Studio
  photographer: I('photo-1622750657128-8d1db9f1ba06', 'Photographer holding a camera, ready to shoot', 'tall'),
  cameraHands: I('photo-1609085178848-b2de5927eda7', 'Photographer’s hands holding a DSLR camera', 'wide', 'tall'),
  photographerField: I('photo-1565689477829-14d5871f5bda', 'Photographer holding a DSLR camera outdoors', 'tall'),
};
