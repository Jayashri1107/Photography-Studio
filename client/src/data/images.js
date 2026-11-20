// The image library — every page reads from here.
// `album` photos are the studio's own work, served from the shared Google Photos album
// at the exact width each screen needs. `unsplash` photos are stand-ins for categories
// the studio has not shared yet (maternity, newborn, events, fashion).
// `shape`: tall | wide | square — used by the masonry gallery.
// `pos`: which part of the photo to keep when it is cropped (CSS object-position).
const I = (unsplash, alt, shape = 'tall') => ({ unsplash, alt, shape });
const GP = 'https://lh3.googleusercontent.com/pw/';
const G = (id, alt, pos = 'center 30%', shape = 'tall') => ({ gp: GP + id, alt, pos, shape });

export const album = {
  // Red bridal shoot
  brideMehendi: G('AP1GczOYczJbHLJuefY2Xugr_9b5T-zl1XawExz-582Ut_bdLqy6zD_RhHR2d2Brt0IiCIzbjfKDay2n98C3gW14n1T7NL1o85kd02q89cXwGsFysJVkUiU', 'Smiling bride in red with gold jewellery showing her mehendi', 'center 25%'),
  redGarden: G('AP1GczM7q73RUgDG6Iobt7EEUAwOVjxUFjPqmdYC1zuxZwJGh_Q87de0EfWN4m980jxwNePOyD3oU6OGwERF0XZ4nGj4dU2N5jkdUfZeEc-S-dLYBTHVrtE', 'Bride and groom in red and white standing against a green garden wall', 'center 55%'),
  // Indoor maroon shoot
  maroonWindow: G('AP1GczMXtLOZoxzcIXy5m0PJmsOx0r0el_w18Y6TyYOyTt22lOP__wHmIXsvweOg6uzKgdZa5PHPTW9AicuyYXABCxqh287Z_A86s7YWyMJPaLZKsjkm12k', 'Bride in a maroon lehenga and groom beside a window', 'center 30%'),
  maroonCurtain: G('AP1GczOZAvsRfvc7BRMqcIa8ti2DoVX6qAHL2RV55MdggN7QdPlSLALAnfsyuVW_mCcmLVVDPIPOsmdh9nerQPnnOpi_CqIlYPurMheKyekOFmpELRvlQDM', 'Couple in wedding attire standing by warm-lit curtains', 'center 45%'),
  maroonEmbrace: G('AP1GczMn0i5uZ6aWtraj8c24m22Ac4KfMHBfcCKB74cqJkZhn0IZPa4XSlaK7jGiShtQIzZlpGG4ZwmoNAZ2D4kfxS2RzIahL3YebUx8BAEIiUSPEgw6zKU', 'Groom in an ivory sherwani holding his bride in maroon', 'center 30%'),
  maroonSmile: G('AP1GczNCrX-EpX90O3d_fVYWFiOBPkCB0sIPeWKuQ-2fl10Gk2FWuAxMD1s06f6wXbtEqlTxrNtGXgPygVuj37nm9-Hy_-2JBtswtaETxUxyEUsNMx73_rg', 'Bride and groom smiling at each other in front of curtains', 'center 28%'),
  maroonClose: G('AP1GczOw5D7k_6k4-eiv8R8IsQLt68lH_HYl0fF3QJFq9irUlLqQzRatv9nVOiQ8C0s3_vPAkVTJA8n2h3H9zEyOgJP726WGFYFQZo7peJPB3e6-kd9WltI', 'Couple leaning in close in soft warm light', 'center 35%'),
  windowLight: G('AP1GczNXPiaKBD1MLVwJEcm3V2CccxHjU13NBluACfjXWBaWiWLzNTdVlxQO91QXYY4Ngq6f_PFyS5_IzepWauAFQWLMRbNMdRJMOrwzSE7IDfLhjn1PHmk', 'Couple facing each other in front of a bright window', 'center 50%'),
  windowLight2: G('AP1GczOXPMvqzE-GWFg_NVmdag2p78ReUCSdJSSM4J-6Z2zZiO3XkFIRXaXFpwgIMqmyM6-BixTfeLPn06tPnB8xxRzzmgAJOnTzxljsCKk9DFQq5sJhIbU', 'Couple silhouetted against a tall window between dark curtains', 'center 50%'),
  windowHands: G('AP1GczMgoA97woXeeX6jypf1yXj_6cXyGOVkxj9rdLEPWAxtVkOa_WMQZvzLe2GRwQUZf-gpQRKQA8arPaY_m0ajoF9jkeIO8KHzEVuq-h9-r-L53fWeCeY', 'Bride and groom holding hands and smiling by a window', 'center 35%'),
  monoKiss: G('AP1GczMTHWPqzwVN4wCOcsQhcT3obI6SLn5e3ogIk8CgjeCU1-4IjkyjHUm9J4I5XT7381jzIJdYnsav-Mbab6lnL3Yq7WPaIc6wti47IzLijQFuMXWBARM', 'Black and white portrait of the groom kissing the bride’s forehead', 'center 30%'),
  foreheadKiss: G('AP1GczMYgdQWOS1ZdMX_74c40kSPxXl-kFoHmMzauSEvanjWENMsjaqRxJkZC9tRRZkU-qKutsLE-R6pgz4OL80YcJGxJHL5vs9E22efdzWyXqjMqbmcSOU', 'Groom kissing his bride’s forehead in soft window light', 'center 30%'),
  windowSoft: G('AP1GczPhE8PogoHBHJ1vpjNepWR3etdIOLay00JXGZ1MkYthN1sV2i8hwkSf5Fn_UdsdyVFVLLD5qyO5EZYx41ytx3yirlS-uhnOTZ8PVPV7WVFfQ_VCmQQ', 'Couple standing together by a window with sheer curtains', 'center 45%'),
  // Pastel garden shoot
  pastelStand: G('AP1GczPtxwjxmmu4TDK716jjzq8Lm3ZtpbOTCPrmzrMw5Htw5KhZmT9nqoSVZYcwGxzOy-tK9QF-b7gcDhrFx1oO_-YMhlRJDzFpwX-TsxVC_m8Rl4okX4Y', 'Couple in pastel outfits standing apart in a garden courtyard', 'center 50%'),
  pastelTogether: G('AP1GczPzHaPyvXRj2Q4DmXupsW-IWYz4QGK9B4Gl1pmFR-s1kd9WgX-EcEYCGkMS69jsCHaSaqA35ABuHZpuNb555PVhEHp3RNcHs2DnbnVXSZFvVbSDK7M', 'Couple in pastel attire standing together under yellow blossoms', 'center 45%'),
  pastelClose: G('AP1GczPHxiL2FqKV9JI3jy2Jmv-G1ZiLg2oz7phjeUSccNC_QmsHyTNHdcD2G80qaOTAPKt6eXY0pk-kecFIamVTAP1jrQ1IRt3YQhTD60zNuTVvAtqEZuw', 'Groom in a safa and bride in blush smiling under yellow flowers', 'center 35%'),
  pastelFull: G('AP1GczPoOxCSRc966TaZH0IT-x3dXA3XZuvGOjPYltqJJKcYjCwgimwI7EuwUgcN3UFLbYYXQeZ-3QaJ_7rjgJIWaYPXcU4e4hLcv0M_9rQ4eW0mdtF4DJI', 'Full-length portrait of the couple beneath a flowering tree', 'center 55%'),
  pastelLook: G('AP1GczN5Q12maOq5myEadY5du4iuULTeI9wopfdGWZt7oYGKqlUjquv19lXZbY2B9Rs8WdVMn9TESGbMqBJZLkSB4NrBJauetfbI1SVRAmecjb2VmUXlt3s', 'Couple looking at each other in a garden of yellow blossoms', 'center 45%'),
  blossomOne: G('AP1GczMAGdqqsPkS6wmb6MztSDI0dPw5MBQiIroYeBDuJ0NxUOzqoFoh55B9XS6sEjG-wM-7JyO1gdIBnPApCt3NJSx8g-Jy1LxkZnKuR-PgxyoUh2aRST0', 'Couple posing among yellow blossoms in pastel clothes', 'center 45%'),
  blossomTwo: G('AP1GczO6dDEE62k0Fal4qLliCCx1VRe3CQNnMmpTa8_cfFDf5KhzUC3-qTVweB0cek146gRVQFQbLR6opL4Cwka3bESH__kXLcU9XN17QZwTXWdov7FnbJk', 'Bride and groom smiling together in front of a flowering hedge', 'center 40%'),
  blossomThree: G('AP1GczP7ROKslpmwd2PTgZieL_vbe5u-1ddgbOIw3fbShoOTRNna4MGH3PJlkhEtkZtQ2tIXK-vL9RtsB09o7b9qPRdnma14Gmb0RCtWpaZaxs-Gwn0ydtU', 'Couple sharing a quiet moment beneath yellow flowers', 'center 40%'),
  blossomFour: G('AP1GczOcy4fp4O_GEL7ccm_PXV1fmCKi3YAviVc8sDll3YoGVKHny1S52q3OMZ8msuN-fdDpvdQ7MTPOOhbFjnkuGK9GrDbNu7OIX7DGZ8U5HFN8g3M0nAo', 'Bride leaning on the groom’s shoulder in a blossoming garden', 'center 40%'),
  pastelPortrait: G('AP1GczO9mx_z63p_wTYXpBZ8c_6jLdcWbKBJoOfuERezxHfUmcFqXcbiPT7k7prwpdsMrknpyl8hwWXuuTcb14t3mZLX92nI_oHEXT6W-JpRskcN2tDJKCk', 'Close portrait of the groom in a peach safa and the bride in pastel', 'center 30%'),
  pastelWalk: G('AP1GczN3IGiEkbsg5q6GfQ2fzRcujAwy1Y8BfDQHxD0fxwMzKSy-OudMoziTKwYsVFCNMKvUY1FHq_PFJr6uCb_nBS0wG-IpJHoQaGAwTsGnTlmfIe0c5hc', 'Couple standing by a white garden wall under green trees', 'center 55%'),
  gardenWalk: G('AP1GczOHmSwRfzCvbzaBLdSadGtfzzS3xWuj2fA7mtuWmGZebOK9cBv5AxD5jSgg-0vY0830rlNUHUumdVXVbiX39gQCKrWQ9LdhryH_GBIvaaLxb-5SzDE', 'Couple walking together along a leafy garden path', 'center 55%'),
};

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

// Every photo is saved in the project (public/photos/<group>-<key>-<width>.webp, made by
// scripts/download-photos.mjs). `local` tells the site to use that copy instead of the online link.
// New photo: add it above, run `node scripts/download-photos.mjs` in the client folder, and commit the new files.
for (const [group, set] of [['album', album], ['stock', images]]) {
  for (const [key, img] of Object.entries(set)) img.local = `${group}-${key}`;
}
