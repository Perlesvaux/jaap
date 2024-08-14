import { testEndpointPOST, testEndpointGET, tarifas } from './lib.js'
const BACKEND = 'http://localhost:3000/'

export const ultimos = [
  {
    actual: await testEndpointPOST(`${BACKEND}ultimo`, {medidor:503}),
    expected: [{
        "medidor": 503,
        "nombre": "Manuel",
        "caserio": "La Pradera",
        "zona": 9,
        "lectura_actual": 270,
        "lectura_anterior": 261,
        "consumo": 9,
        "desde": "2023-11-15T06:00:00.000Z",
        "hasta": "2023-12-15T06:00:00.000Z",
        "dias": 31,
        "numero": 99893,
        "total": "3.85"
    }]
    },
    {
    actual:await testEndpointPOST(`${BACKEND}ultimo`, {medidor:502}),
    expected:[{
        "medidor": 502,
        "nombre": "Pedro",
        "caserio": "El Progreso",
        "zona": 13,
        "lectura_actual": 265,
        "lectura_anterior": 260,
        "consumo": 5,
        "desde": "2023-09-15T06:00:00.000Z",
        "hasta": "2023-10-15T06:00:00.000Z",
        "dias": 31,
        "numero": 99896,
        "total": "2.61"
    }]
  },
  {
    actual: await testEndpointPOST(`${BACKEND}ultimo`, {medidor:511}),
    expected:[{
      "medidor": 511,
      "nombre": "Jaime",
      "caserio": "La Pradera",
      "zona": 9,
      "lectura_actual": 270,
      "lectura_anterior": 261,
      "consumo": 9,
      "desde": "2023-09-15T06:00:00.000Z",
      "hasta": "2023-10-15T06:00:00.000Z",
      "dias": 31,
      "numero": 99897,
      "total": "3.85"}]
  }
  ]

export const usuarios = [
  {
    actual:await testEndpointGET(`${BACKEND}usuarios`),
    expected:[
    {
        "medidor": 503,
        "nombre": "Manuel",
        "caserio": "La Pradera",
        "zona": 9
    },
    {
        "medidor": 520,
        "nombre": "Josh",
        "caserio": "La Providencia",
        "zona": 11
    },
    {
        "medidor": 502,
        "nombre": "Pedro",
        "caserio": "El Progreso",
        "zona": 13
    },
    {
        "medidor": 511,
        "nombre": "Jaime",
        "caserio": "La Pradera",
        "zona": 9
    }
]
  }
  
]


export const recientes = [
{
    actual: await testEndpointGET(`${BACKEND}recientes`),
    expected: [
    {
        "medidor": 502,
        "nombre": "Pedro",
        "caserio": "El Progreso",
        "zona": 13,
        "lectura_actual": 265,
        "lectura_anterior": 260,
        "consumo": 5,
        "desde": "2023-09-15T06:00:00.000Z",
        "hasta": "2023-10-15T06:00:00.000Z",
        "dias": 31,
        "numero": 99896,
        "total": "2.61"
    },
    {
        "medidor": 503,
        "nombre": "Manuel",
        "caserio": "La Pradera",
        "zona": 9,
        "lectura_actual": 270,
        "lectura_anterior": 261,
        "consumo": 9,
        "desde": "2023-11-15T06:00:00.000Z",
        "hasta": "2023-12-15T06:00:00.000Z",
        "dias": 31,
        "numero": 99893,
        "total": "3.85"
    },
    {
        "medidor": 511,
        "nombre": "Jaime",
        "caserio": "La Pradera",
        "zona": 9,
        "lectura_actual": 270,
        "lectura_anterior": 261,
        "consumo": 9,
        "desde": "2023-09-15T06:00:00.000Z",
        "hasta": "2023-10-15T06:00:00.000Z",
        "dias": 31,
        "numero": 99897,
        "total": "3.85"
    },
    {
        "medidor": 520,
        "nombre": "Josh",
        "caserio": "La Providencia",
        "zona": 11,
        "lectura_actual": 265,
        "lectura_anterior": 260,
        "consumo": 5,
        "desde": "2023-11-15T06:00:00.000Z",
        "hasta": "2023-12-15T06:00:00.000Z",
        "dias": 30,
        "numero": 99894,
        "total": "2.61"
    }
]
  }

]


export const generar_recibo =[
  {
    actual: await testEndpointPOST(`${BACKEND}generar-recibo`, {medidor:511, lectura_nueva:299}),
    expected:[
    {
        "medidor": 511,
        "nombre": "Jaime",
        "caserio": "La Pradera",
        "zona": 9,
        "lectura_actual": 299,
        "lectura_anterior": 270,
        "consumo": 29,
        "desde": "2023-10-15T06:00:00.000Z",
        //"hasta": new Date(Date.now()),
        //"dias": 302,
        "numero": 'TBD',
        "total": "8.85"
    }
]
  },{
    actual: await testEndpointPOST(`${BACKEND}generar-recibo`, {medidor: 502, lectura_nueva:299}),
    expected:[
    {
        "medidor": 502,
        "nombre": "Pedro",
        "caserio": "El Progreso",
        "zona": 13,
        "lectura_actual": 299,
        "lectura_anterior": 265,
        "consumo": 34,
        "desde": "2023-10-15T06:00:00.000Z",
        //"hasta": "2024-08-12T08:57:58.619Z",
        //"dias": 303,
        "numero": 'TBD',
        "total": "10.10"
    }
]
  }
]

export const de_7_40 = [
  { actual: 7  , expected:3.35 },
  { actual: 8  , expected:3.60 },
  { actual: 9  , expected:3.85 },
  { actual: 10 , expected:4.10 },
  { actual: 11 , expected:4.35 },
  { actual: 12 , expected:4.60 },
  { actual: 13 , expected:4.85 },
  { actual: 14 , expected:5.10 },
  { actual: 15 , expected:5.35 },
  { actual: 16 , expected:5.60 },
  { actual: 17 , expected:5.85 },
  { actual: 18 , expected:6.10 },
  { actual: 19 , expected:6.35 },
  { actual: 20 , expected:6.60 },
  { actual: 21 , expected:6.85 },
  { actual: 22 , expected:7.10 },
  { actual: 23 , expected:7.35 },
  { actual: 24 , expected:7.60 },
  { actual: 25 , expected:7.85 },
  { actual: 26 , expected:8.10 },
  { actual: 27 , expected:8.35 },
  { actual: 28 , expected:8.60 },
  { actual: 29 , expected:8.85 },
  { actual: 30 , expected:9.10 },
  { actual: 31 , expected:9.35 },
  { actual: 32 , expected:9.60 },
  { actual: 33 , expected:9.85 },
  { actual: 34 , expected:10.10 },
  { actual: 35 , expected:10.35 },
  { actual: 36 , expected:10.60 },
  { actual: 37 , expected:10.85 },
  { actual: 38 , expected:11.10 },
  { actual: 39 , expected:11.35 },
  { actual: 40 , expected:11.60 }
]

export const de_41_50 = [
  { actual:41, expected: 12.00 },
  { actual:42, expected: 12.40 },
  { actual:43, expected: 12.80 },
  { actual:44, expected: 13.20 },
  { actual:45, expected: 13.60 },
  { actual:46, expected: 14.00 },
  { actual:47, expected: 14.40 },
  { actual:48, expected: 14.80 },
  { actual:49, expected: 15.20 },
  { actual:50, expected: 15.60 }
]

export const de_51_100 = [
  { actual:51,  expected:39.85 },
  { actual:52,  expected:40.60 },
  { actual:53,  expected:41.35 },
  { actual:54,  expected:42.10 },
  { actual:55,  expected:42.85 },
  { actual:56,  expected:43.60 },
  { actual:57,  expected:44.35 },
  { actual:58,  expected:45.10 },
  { actual:59,  expected:45.85 },
  { actual:60,  expected:46.60 },
  { actual:61,  expected:47.35 },
  { actual:62,  expected:48.10 },
  { actual:63,  expected:48.85 },
  { actual:64,  expected:49.60 },
  { actual:65,  expected:50.35 },
  { actual:66,  expected:51.10 },
  { actual:67,  expected:51.85 },
  { actual:68,  expected:52.60 },
  { actual:69,  expected:53.35 },
  { actual:70,  expected:54.10 },
  { actual:71,  expected:54.85 },
  { actual:72,  expected:55.60 },
  { actual:73,  expected:56.35 },
  { actual:74,  expected:57.10 },
  { actual:75,  expected:57.85 },
  { actual:76,  expected:58.60 },
  { actual:77,  expected:59.35 },
  { actual:78,  expected:60.10 },
  { actual:79,  expected:60.85 },
  { actual:80,  expected:61.60 },
  { actual:81,  expected:62.35 },
  { actual:82,  expected:63.10 },
  { actual:83,  expected:63.85 },
  { actual:84,  expected:64.60 },
  { actual:85,  expected:65.35 },
  { actual:86,  expected:66.10 },
  { actual:87,  expected:66.85 },
  { actual:88,  expected:67.60 },
  { actual:89,  expected:68.35 },
  { actual:90,  expected:69.10 },
  { actual:91,  expected:69.85 },
  { actual:92,  expected:70.60 },
  { actual:93,  expected:71.35 },
  { actual:94,  expected:72.10 },
  { actual:95,  expected:72.85 },
  { actual:96,  expected:73.60 },
  { actual:97,  expected:74.35 },
  { actual:98,  expected:75.10 },
  { actual:99,  expected:75.85 },
  { actual:100, expected:76.60 }
]


export const de_101_150 = [
  { actual:101, expected:102.60 },
  { actual:102, expected:103.60 },
  { actual:103, expected:104.60 },
  { actual:104, expected:105.60 },
  { actual:105, expected:106.60 },
  { actual:106, expected:107.60 },
  { actual:107, expected:108.60 },
  { actual:108, expected:109.60 },
  { actual:109, expected:110.60 },
  { actual:110, expected:111.60 },
  { actual:111, expected:112.60 },
  { actual:112, expected:113.60 },
  { actual:113, expected:114.60 },
  { actual:114, expected:115.60 },
  { actual:115, expected:116.60 },
  { actual:116, expected:117.60 },
  { actual:117, expected:118.60 },
  { actual:118, expected:119.60 },
  { actual:119, expected:120.60 },
  { actual:120, expected:121.60 },
  { actual:121, expected:122.60 },
  { actual:122, expected:123.60 },
  { actual:123, expected:124.60 },
  { actual:124, expected:125.60 },
  { actual:125, expected:126.60 },
  { actual:126, expected:127.60 },
  { actual:127, expected:128.60 },
  { actual:128, expected:129.60 },
  { actual:129, expected:130.60 },
  { actual:130, expected:131.60 },
  { actual:131, expected:132.60 },
  { actual:132, expected:133.60 },
  { actual:133, expected:134.60 },
  { actual:134, expected:135.60 },
  { actual:135, expected:136.60 },
  { actual:136, expected:137.60 },
  { actual:137, expected:138.60 },
  { actual:138, expected:139.60 },
  { actual:139, expected:140.60 },
  { actual:140, expected:141.60 },
  { actual:141, expected:142.60 },
  { actual:142, expected:143.60 },
  { actual:143, expected:144.60 },
  { actual:144, expected:145.60 },
  { actual:145, expected:146.60 },
  { actual:146, expected:147.60 },
  { actual:147, expected:148.60 },
  { actual:148, expected:149.60 },
  { actual:149, expected:150.60 },
  { actual:150, expected:151.60 }
]

export const de_151_200 = [

  { actual:151, expected:190.35 },
  { actual:152, expected:191.60 },
  { actual:153, expected:192.85 },
  { actual:154, expected:194.10 },
  { actual:155, expected:195.35 },
  { actual:156, expected:196.60 },
  { actual:157, expected:197.85 },
  { actual:158, expected:199.10 },
  { actual:159, expected:200.35 },
  { actual:160, expected:201.60 },
  { actual:161, expected:202.85 },
  { actual:162, expected:204.10 },
  { actual:163, expected:205.35 },
  { actual:164, expected:206.60 },
  { actual:165, expected:207.85 },
  { actual:166, expected:209.10 },
  { actual:167, expected:210.35 },
  { actual:168, expected:211.60 },
  { actual:169, expected:212.85 },
  { actual:170, expected:214.10 },
  { actual:171, expected:215.35 },
  { actual:172, expected:216.60 },
  { actual:173, expected:217.85 },
  { actual:174, expected:219.10 },
  { actual:175, expected:220.35 },
  { actual:176, expected:221.60 },
  { actual:177, expected:222.85 },
  { actual:178, expected:224.10 },
  { actual:179, expected:225.35 },
  { actual:180, expected:226.60 },
  { actual:181, expected:227.85 },
  { actual:182, expected:229.10 },
  { actual:183, expected:230.35 },
  { actual:184, expected:231.60 },
  { actual:185, expected:232.85 },
  { actual:186, expected:234.10 },
  { actual:187, expected:235.35 },
  { actual:188, expected:236.60 },
  { actual:189, expected:237.85 },
  { actual:190, expected:239.10 },
  { actual:191, expected:240.35 },
  { actual:192, expected:241.60 },
  { actual:193, expected:242.85 },
  { actual:194, expected:244.10 },
  { actual:195, expected:245.35 },
  { actual:196, expected:246.60 },
  { actual:197, expected:247.85 },
  { actual:198, expected:249.10 },
  { actual:199, expected:250.35 },
  { actual:200, expected:251.60 }

]

export const menos_de_6 = [
  { actual:0, expected:2.61 },
  { actual:1, expected:2.61 },
  { actual:2, expected:2.61 },
  { actual:3, expected:2.61 },
  { actual:4, expected:2.61 },
  { actual:5, expected:2.61 },
  { actual:6, expected:2.61 }
]

export const mas_de_201 = [
  { actual:201, expected:303.10 },
  { actual:301, expected:453.10 },
  { actual:401, expected:603.10 },
  { actual:501, expected:753.10 },
  { actual:601, expected:903.10 },
  { actual:701, expected:1053.10 },
  { actual:801, expected:1203.10 }
]




