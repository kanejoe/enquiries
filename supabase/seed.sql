select vault.create_secret(
  'http://api.supabase.internal:8000',
  'supabase_url'
);

SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: precedents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."precedents" ("id", "name", "subname", "is_locked", "asset_id", "is_archived", "created_at", "created_by") OVERRIDING SYSTEM VALUE VALUES
	(3, 'Requisitions on Title', '2018 Edition', false, NULL, true, '2018-11-26', 'Law Society of Ireland'),
	(4, 'Pre-Lease Enquiries', '2022 Edition', false, NULL, false, '2022-11-26', 'Joe Kane'),
	(2, 'Pre-Lease Enquiries', '2015 Edition', false, NULL, true, '2015-11-26', 'default'),
	(1, 'Requisitions on Title', '2019 (Revised) Edition', true, NULL, false, '2019-11-26', 'Law Society of Ireland');


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."properties" ("id", "created_at", "property", "eircode", "vendor", "category", "status", "is_archived") VALUES
	(1244, '2023-10-03 13:55:58.158278+00', '69591, 3797 Gabriel Trace, South Estrellahaven', '22968', 'Mable Lind', 'residential', 'Completed', false),
	(1245, '2023-10-03 13:55:58.30594+00', '1734, 60702 Jonathan Radial, Levitown', '93972-6866', 'Lucille Bosco', 'commercial', 'In Progress', false),
	(1246, '2023-10-03 13:55:58.387658+00', '986, 2411 Cruickshank Pine, Bogisichworth', '36821-8891', 'Dianna Howe', 'commercial', 'Cancelled', false),
	(1247, '2023-10-03 13:55:58.483115+00', '798, 4702 Thiel Harbor, Fort Alexie', '83762-6482', 'Simon Will', 'residential', 'In Progress', false),
	(1248, '2023-10-03 13:55:58.558788+00', '8988, 8632 Friesen Turnpike, East Alf', '10663-9148', 'Sylvester Luettgen', 'residential', 'Completed', false),
	(1249, '2023-10-03 13:55:58.657015+00', '1272, 25101 Dashawn Glens, East Eddberg', '71216-3394', 'Arthur Towne', 'commercial', 'In Progress', false),
	(1250, '2023-10-03 13:55:58.72277+00', '6885, 5091 Sylvester Coves, Port Lester', '95337-6265', 'Cory Gerhold-Shields', 'agricultural', 'Completed', false),
	(1251, '2023-10-03 13:55:58.802183+00', '3799, 72390 Armstrong Turnpike, Uliceston', '57381', 'Marsha Abernathy', 'agricultural', 'Completed', false),
	(1252, '2023-10-03 13:55:58.880907+00', '474, 45381 Lacy Villages, Camdenton', '76895', 'Erick Gleichner MD', 'residential', 'In Progress', false),
	(1253, '2023-10-03 13:55:58.963519+00', '482, 21319 Torrance Estates, West Antonietta', '72135-6172', 'Johnnie DuBuque', 'agricultural', 'In Progress', false),
	(1254, '2023-10-03 13:55:59.039093+00', '4741, 93115 Torphy Square, Coralieberg', '83394-1817', 'Ivan Hegmann', 'residential', 'Completed', false),
	(1255, '2023-10-03 13:55:59.122651+00', '2557, 460 Earl Junctions, New Nellaport', '03204', 'Blanca Goodwin', 'commercial', 'Completed', false),
	(1256, '2023-10-03 13:55:59.196362+00', '297, 1476 Carter Road, Ellicott City', '16867', 'Ana Lockman', 'agricultural', 'Cancelled', false),
	(1257, '2023-10-03 13:55:59.277867+00', '2561, 6604 Cartwright Mall, Vedahaven', '56565-7256', 'Victoria Renner-Haag MD', 'commercial', 'In Progress', false),
	(1258, '2023-10-03 13:55:59.340136+00', '67813, 149 Tyrell Meadow, Hayesburgh', '59584', 'Paulette Morar', 'commercial', 'Cancelled', false),
	(1259, '2023-10-03 13:55:59.409971+00', '44930, 7023 Vicky Groves, South Reillyview', '78331', 'Janis O''Conner', 'residential', 'In Progress', false),
	(1260, '2023-10-03 13:55:59.474956+00', '4357, 58335 Labadie Roads, Antoinetteberg', '05813', 'Deborah Stokes', 'residential', 'In Progress', false),
	(1261, '2023-10-03 13:55:59.56306+00', '607, 3202 Cummerata Rest, Fort Carole', '31608-0102', 'Brandy Kutch', 'commercial', 'Cancelled', false),
	(1262, '2023-10-03 13:55:59.641342+00', '1889, 5100 Larkin Forge, Florinefield', '15040', 'Dixie Aufderhar', 'residential', 'Cancelled', false),
	(1263, '2023-10-03 13:55:59.700999+00', '10186, 87193 Bettye Drives, Leonorfort', '84131-2801', 'Hannah Cartwright II', 'agricultural', 'Completed', false),
	(1264, '2023-10-03 13:55:59.765861+00', '954, 151 Glennie Shores, Port Lukas', '93067', 'Chris Kautzer', 'residential', 'Completed', false),
	(1265, '2023-10-03 13:55:59.840917+00', '358, 5661 Michaela Cliff, Meridian', '74748-1847', 'Laverne Hermann', 'agricultural', 'Completed', false),
	(1266, '2023-10-03 13:55:59.91089+00', '8230, 8356 Meredith Burg, Elmiraton', '40242', 'Marty Greenholt', 'residential', 'Cancelled', false),
	(1267, '2023-10-03 13:55:59.980311+00', '8685, 890 Melany Glen, Loweview', '87950', 'Regina Schiller', 'agricultural', 'Completed', false),
	(1268, '2023-10-03 13:56:00.076025+00', '6636, 1983 Krista Common, Tremblayhaven', '39465', 'Dallas Breitenberg', 'agricultural', 'Cancelled', false),
	(1269, '2023-10-03 13:56:00.146459+00', '815, 94276 Stanford Wells, Lake Domenicfort', '32543-0346', 'Gina Hand', 'commercial', 'Cancelled', false),
	(1270, '2023-10-03 13:56:00.224957+00', '5514, 79159 Ernesto Spur, Mikaylafield', '34494', 'Gloria Morar', 'commercial', 'Completed', false),
	(1271, '2023-10-03 13:56:00.30043+00', '282, 5009 Lennie Terrace, Fremont', '29779-1189', 'Silvia Kuvalis', 'residential', 'Completed', false),
	(1272, '2023-10-03 13:56:00.383435+00', '20947, 12147 Mueller Union, East Bradford', '69682-0759', 'Alton Marvin I', 'residential', 'Cancelled', false),
	(1273, '2023-10-03 13:56:00.453018+00', '2357, 841 Christophe Trace, West Federico', '76085', 'Sam Glover', 'commercial', 'In Progress', false),
	(1274, '2023-10-03 13:56:00.512712+00', '22468, 2469 Sheridan Pike, South Glenna', '28842', 'Ollie Stiedemann', 'residential', 'In Progress', false),
	(1275, '2023-10-03 13:56:00.59743+00', '17346, 418 Yundt Pines, Mullerfurt', '10986', 'Miss Shelia Corkery Sr.', 'agricultural', 'Cancelled', false),
	(1276, '2023-10-03 13:56:00.661543+00', '3228, 4479 Kassulke Highway, Moore', '59431-8877', 'Boyd Hirthe', 'commercial', 'In Progress', false),
	(1277, '2023-10-03 13:56:00.743454+00', '494, 3381 Dorothy Ports, South Dean', '23763', 'Jack Schamberger', 'agricultural', 'In Progress', false),
	(1278, '2023-10-03 13:56:00.81134+00', '7281, 90505 Emmanuelle Hollow, Bethlehem', '87413-6158', 'Lynn Wiza-McClure', 'residential', 'Cancelled', false),
	(1279, '2023-10-03 13:56:00.888391+00', '2131, 599 Wisoky Groves, West Ilene', '42339-7229', 'Ignacio Legros', 'commercial', 'Cancelled', false),
	(1280, '2023-10-03 13:56:00.946462+00', '691, 250 Lorenz Port, Sandratown', '79551', 'Muriel Schmitt', 'commercial', 'In Progress', false),
	(1281, '2023-10-03 13:56:01.02887+00', '580, 64134 Nicholas Bridge, South Vern', '05792', 'Robin Dach', 'residential', 'Completed', false),
	(1282, '2023-10-03 13:56:01.093195+00', '176, 99320 Elmer Cove, Vincenzocester', '12783', 'Gwendolyn Torp', 'commercial', 'Cancelled', false),
	(1283, '2023-10-03 13:56:01.156437+00', '465, 91394 Linwood Viaduct, Raleigh', '93475', 'Sheldon Beatty', 'agricultural', 'In Progress', false),
	(1284, '2023-10-03 13:56:01.21431+00', '7886, 74257 Mittie Estate, West Makenna', '03262', 'Mr. Willis Romaguera', 'agricultural', 'Completed', false),
	(1285, '2023-10-03 13:56:01.291658+00', '95539, 6754 Kling Walks, Huelbury', '44604', 'Marcos Rohan', 'residential', 'In Progress', false),
	(1286, '2023-10-03 13:56:01.353895+00', '4900, 19451 Annalise Brook, South Eleanora', '90470', 'Enrique Mohr', 'commercial', 'In Progress', false),
	(1287, '2023-10-03 13:56:01.438352+00', '8154, 3089 Bernard Crescent, South Audrey', '79979-9050', 'Darla Cartwright', 'residential', 'Completed', false),
	(1288, '2023-10-03 13:56:01.512752+00', '18820, 4984 Considine Plains, Juwanfurt', '09097-3033', 'Wilbert Heaney', 'commercial', 'Cancelled', false),
	(1289, '2023-10-03 13:56:01.569742+00', '217, 4433 Albertha Skyway, East Reed', '84207', 'Krista Schimmel', 'residential', 'Completed', false),
	(1290, '2023-10-03 13:56:01.655569+00', '2251, 481 Toy Spurs, Fort Keira', '26858-4455', 'Ian Douglas', 'commercial', 'In Progress', false),
	(1291, '2023-10-03 13:56:01.729274+00', '62214, 9593 Parker Harbors, West Kiel', '99992', 'Maurice Kuphal', 'commercial', 'Completed', false),
	(1292, '2023-10-03 13:56:01.796086+00', '69317, 104 Vivian Way, Waukesha', '75798', 'Kerry Paucek', 'agricultural', 'Completed', false),
	(1293, '2023-10-03 13:56:02.04141+00', '222, 640 Cathryn Fork, Fort Doylefort', '74552-0997', 'Chris Marvin', 'commercial', 'Cancelled', false),
	(1294, '2023-10-03 13:56:02.09868+00', '4835, 644 Brendan Mountains, Ebertview', '11205', 'Leona Schoen', 'agricultural', 'In Progress', false),
	(1295, '2023-10-03 13:56:02.179356+00', '289, 580 Chaim Crest, South Lesley', '90398', 'Candice Johnston', 'commercial', 'Cancelled', false),
	(1296, '2023-10-03 13:56:02.238467+00', '7948, 625 Kelli Plain, Langworthtown', '52188', 'Colin Boyer', 'agricultural', 'Completed', false),
	(1297, '2023-10-03 13:56:02.303426+00', '9965, 602 Dietrich Rue, Lake Bradyfurt', '08025-0921', 'Wallace Dooley', 'agricultural', 'Cancelled', false),
	(1298, '2023-10-03 13:56:02.364056+00', '95876, 663 Justine Lake, North Helga', '61378', 'Celia Ernser', 'residential', 'Completed', false),
	(1299, '2023-10-03 13:56:02.445915+00', '1927, 600 Labadie Fall, Virginieberg', '76604-5113', 'Peggy Daugherty', 'residential', 'In Progress', false),
	(1300, '2023-10-03 13:56:02.525071+00', '7306, 374 Giovanni Crest, Fort Claudie', '97982-4433', 'Judith Stiedemann', 'agricultural', 'Completed', false),
	(1301, '2023-10-03 13:56:02.615481+00', '3789, 719 Casimir Mount, Faheybury', '78530-6129', 'Mr. Lorenzo Ebert', 'agricultural', 'Cancelled', false),
	(1302, '2023-10-03 13:56:02.683992+00', '3996, 38882 Boyer Way, Marksfort', '94541-0427', 'Alexandra Lynch-Mosciski', 'commercial', 'Cancelled', false),
	(1303, '2023-10-03 13:56:02.758796+00', '447, 7810 Janie Manors, Rippintown', '26697', 'Israel Bergstrom', 'agricultural', 'Cancelled', false),
	(1304, '2023-10-03 13:56:02.828572+00', '77161, 9101 Justus Creek, Pfefferview', '20562-6212', 'Tammy Sipes', 'commercial', 'Completed', false),
	(1305, '2023-10-03 13:56:02.903082+00', '836, 765 Hassie Fields, Elenastad', '29000-4525', 'Lawrence MacGyver', 'agricultural', 'Completed', false),
	(1306, '2023-10-03 13:56:02.977076+00', '8175, 466 Ivory Shoal, Verlastad', '73791', 'Gwen Harber', 'commercial', 'Completed', false),
	(1307, '2023-10-03 13:56:03.037701+00', '9484, 6043 McDermott Canyon, Miami Beach', '77442', 'Natalie Feest', 'residential', 'In Progress', false),
	(1308, '2023-10-03 13:56:03.116999+00', '36174, 90831 Jerrold Pike, Lake Kylieton', '63946', 'Terry Emard', 'residential', 'In Progress', false),
	(1309, '2023-10-03 13:56:03.204778+00', '823, 246 Alvah Club, Cuyahoga Falls', '79865-5049', 'Harvey Waters Sr.', 'residential', 'Completed', false),
	(1310, '2023-10-03 13:56:03.270889+00', '66934, 188 Brakus Ridges, Deltahaven', '86913', 'Doris Bogan', 'agricultural', 'In Progress', false),
	(1311, '2023-10-03 13:56:03.355596+00', '74061, 4878 Pollich Fork, Lake Rowan', '32511', 'Leslie Franey', 'residential', 'Completed', false),
	(1312, '2023-10-03 13:56:03.423566+00', '884, 4807 Haylie Skyway, North Jana', '34391-8607', 'Roderick Brown Sr.', 'agricultural', 'Completed', false),
	(1313, '2023-10-03 13:56:03.493192+00', '7198, 56722 Dario Green, Lake Connor', '14072-7336', 'Mrs. Clara Hermann', 'agricultural', 'In Progress', false),
	(1314, '2023-10-03 13:56:03.554999+00', '31245, 466 Allison Freeway, Lake Katlynburgh', '45467-5626', 'Warren Swaniawski', 'commercial', 'Completed', false),
	(1315, '2023-10-03 13:56:03.611417+00', '172, 981 Carolanne Ranch, Port Aileen', '33193', 'Dr. Evan Gleason', 'residential', 'Completed', false),
	(1316, '2023-10-03 13:56:03.693177+00', '594, 2376 Mayer Spur, Pfannerstillberg', '56733', 'Winifred Nienow', 'residential', 'Cancelled', false),
	(1317, '2023-10-03 13:56:03.753386+00', '5051, 804 Mohamed Fall, Fort Alphonso', '74904', 'Eunice Gleason', 'agricultural', 'In Progress', false),
	(1318, '2023-10-03 13:56:03.818681+00', '479, 991 Estrella Square, East Toy', '79101', 'Jacquelyn Medhurst', 'commercial', 'Cancelled', false),
	(1319, '2023-10-03 13:56:03.880993+00', '3008, 7750 Ziemann Junction, Port Lora', '11215', 'Ms. Leticia Sipes', 'residential', 'Cancelled', false),
	(1320, '2023-10-03 13:56:03.950132+00', '9447, 92041 Stracke Lane, Fort Cornelius', '32407', 'Stacey Waters-Lockman', 'agricultural', 'In Progress', false),
	(1321, '2023-10-03 13:56:04.018304+00', '820, 963 Trystan Row, Bayonne', '12605-7401', 'Philip Kirlin', 'agricultural', 'In Progress', false),
	(1322, '2023-10-03 13:56:04.116398+00', '2647, 154 Pierce Loaf, O''Keefeport', '14386-6297', 'Bridget Stokes', 'agricultural', 'Completed', false),
	(1323, '2023-10-03 13:56:04.184668+00', '5436, 3210 Okuneva Ranch, Lake Katelynnport', '51168', 'Mrs. Toni Hoppe', 'commercial', 'In Progress', false),
	(1324, '2023-10-03 13:56:04.264353+00', '8204, 143 Jaeden Square, East Kenland', '20979-0605', 'Elvira Moore Jr.', 'commercial', 'Completed', false),
	(1325, '2023-10-03 13:56:04.357613+00', '625, 5584 Wuckert Skyway, Port Josie', '51418', 'Sean Spinka', 'agricultural', 'Completed', false),
	(1326, '2023-10-03 13:56:04.439617+00', '82666, 6711 Kuhn Lake, Elizabeth', '17512-3771', 'Shane Beer', 'agricultural', 'Completed', false),
	(1327, '2023-10-03 13:56:04.500954+00', '410, 64833 Adams Spur, Bernierstead', '37537-5933', 'Antonia Schaefer-Cremin', 'agricultural', 'Cancelled', false),
	(1328, '2023-10-03 13:56:04.559988+00', '817, 83512 Gorczany Center, Stuartberg', '10827-4663', 'Horace Hickle', 'residential', 'Cancelled', false),
	(1329, '2023-10-03 13:56:04.663629+00', '9352, 11887 Gudrun Motorway, St. Paul', '86185', 'Andres Becker', 'agricultural', 'Cancelled', false),
	(1330, '2023-10-03 13:56:04.745629+00', '6155, 87814 Lowe Junctions, Ilianaton', '19663-3568', 'Danny Larkin', 'commercial', 'In Progress', false),
	(1331, '2023-10-03 13:56:04.818207+00', '1588, 469 Walter Estate, Bayerstad', '88640-6696', 'Corey Champlin', 'agricultural', 'Cancelled', false),
	(1332, '2023-10-03 13:56:04.877862+00', '73165, 625 Orland Heights, South Odessa', '43800-7171', 'Otis Anderson', 'agricultural', 'In Progress', false),
	(1333, '2023-10-03 13:56:04.945302+00', '585, 26364 Leta Ford, East Los Angeles', '09597', 'Cornelius Davis', 'agricultural', 'Cancelled', false),
	(1334, '2023-10-03 13:56:05.003193+00', '50917, 8968 Koby Lake, Karenberg', '45526-8287', 'Janie Runolfsdottir', 'commercial', 'Completed', false),
	(1335, '2023-10-03 13:56:05.058431+00', '381, 891 Myron Lights, Tellyworth', '42265', 'Mattie Blick', 'residential', 'Completed', false),
	(1336, '2023-10-03 13:56:05.136742+00', '59247, 33391 Effertz Terrace, South Tierraburgh', '35853-9341', 'Marcos Wilderman', 'commercial', 'In Progress', false),
	(1337, '2023-10-03 13:56:05.202173+00', '91185, 81493 Konopelski Trace, Port Brigitteland', '03311', 'Erika Stroman', 'agricultural', 'In Progress', false),
	(1338, '2023-10-03 13:56:05.278564+00', '43460, 96975 Mittie Summit, Fort Shanonview', '93935', 'Sergio Corwin', 'agricultural', 'In Progress', false),
	(1339, '2023-10-03 13:56:05.360131+00', '228, 6866 Russel Neck, North Lue', '01537-0177', 'John Johnson', 'agricultural', 'In Progress', false),
	(1340, '2023-10-03 13:56:05.442177+00', '2738, 9346 Powlowski Ferry, Feeneychester', '45796', 'Kristin Howe', 'agricultural', 'In Progress', false),
	(1341, '2023-10-03 13:56:05.514456+00', '529, 80118 Elda Causeway, Fort Bella', '22466-7666', 'Randall Abernathy', 'commercial', 'Cancelled', false),
	(1342, '2023-10-03 13:56:05.574426+00', '133, 91041 Cartwright Square, Cassinside', '54098', 'Billy Cole', 'commercial', 'Cancelled', false),
	(1343, '2023-10-03 13:56:05.633407+00', '2667, 4806 Katelynn Coves, East Brianachester', '84147', 'Ruth Schimmel', 'residential', 'In Progress', false),
	(1344, '2023-10-03 13:56:05.691694+00', '6030, 168 Crist Spur, Dickinsonboro', '27993-7843', 'Dr. Roberto Carter', 'commercial', 'In Progress', false),
	(1345, '2023-10-03 13:56:05.762046+00', '8438, 14846 Avery Motorway, Fort Mariah', '80540-3955', 'Carmen Hackett', 'commercial', 'In Progress', false),
	(1346, '2023-10-03 13:56:05.821929+00', '358, 672 Eldridge Flat, Lake Ansley', '63173-8476', 'Hattie Mohr', 'residential', 'Cancelled', false),
	(1347, '2023-10-03 13:56:05.887752+00', '21161, 708 Kadin Harbors, Lake Kameron', '82060', 'Caleb Buckridge', 'agricultural', 'Completed', false),
	(1348, '2023-10-03 13:56:05.959006+00', '1467, 30175 Murl Skyway, Fort Tamara', '55376', 'Kristie Hansen MD', 'commercial', 'Completed', false),
	(1349, '2023-10-03 13:56:06.028732+00', '9724, 2829 Johnston Club, Caspertown', '18641-8501', 'Kimberly Schumm-Legros', 'commercial', 'Cancelled', false),
	(1350, '2023-10-03 13:56:06.111813+00', '661, 689 Gisselle Isle, Donnyworth', '91516-1736', 'Doreen Runolfsson', 'commercial', 'Completed', false),
	(1351, '2023-10-03 13:56:06.178931+00', '70870, 209 Champlin Extension, Mesquite', '28482-4848', 'Bernadette Spencer', 'commercial', 'Cancelled', false),
	(1352, '2023-10-03 13:56:06.264705+00', '88506, 7159 Alana Road, New Brenda', '81785-0361', 'Herman Mertz', 'agricultural', 'In Progress', false),
	(1353, '2023-10-03 13:56:06.376283+00', '5539, 53614 Mosciski Estate, East Margiecester', '96089', 'Bryant Rolfson', 'commercial', 'In Progress', false),
	(1354, '2023-10-03 13:56:06.458407+00', '2266, 2632 Brando Shore, Wisozkcester', '59600-3935', 'Irene Langosh DDS', 'agricultural', 'Cancelled', false),
	(1355, '2023-10-03 13:56:06.534967+00', '72281, 339 Owen Turnpike, St. Joseph', '25642-7106', 'Marian Conroy-Hartmann', 'agricultural', 'Completed', false),
	(1356, '2023-10-03 13:56:06.615432+00', '13749, 27552 Armstrong Fort, Lake Forrest', '62477', 'Dr. Patrick Bruen', 'commercial', 'In Progress', false),
	(1357, '2023-10-03 13:56:06.69084+00', '15215, 3055 Jaskolski Skyway, Port Toneybury', '75628-4125', 'Mark Ritchie', 'agricultural', 'Cancelled', false),
	(1358, '2023-10-03 13:56:06.758652+00', '257, 1247 Keebler Fort, Reneeborough', '91676', 'Maurice Ullrich', 'residential', 'In Progress', false),
	(1359, '2023-10-03 13:56:06.827369+00', '2303, 471 Waters Squares, Florence-Graham', '80385', 'Darin Barton', 'commercial', 'In Progress', false),
	(1360, '2023-10-03 13:56:06.884713+00', '775, 5882 Zulauf Orchard, El Monte', '60539-5263', 'Johnathan Hills-Nikolaus', 'agricultural', 'In Progress', false),
	(1361, '2023-10-03 13:56:06.950938+00', '98674, 1415 Hassie Highway, Jonesstad', '45541', 'Georgia Hyatt', 'commercial', 'Cancelled', false),
	(1362, '2023-10-03 13:56:07.008027+00', '92379, 90102 Emily Extension, Hardyberg', '65539', 'Edwin Ritchie', 'agricultural', 'Completed', false),
	(1363, '2023-10-03 13:56:07.075746+00', '45239, 70697 Isobel Summit, Little Rock', '81692-1703', 'Wilbert Gibson', 'agricultural', 'Cancelled', false),
	(1364, '2023-10-03 13:56:07.146936+00', '2104, 73227 Jordi Prairie, Sophieland', '52828', 'Phillip Lind', 'commercial', 'Cancelled', false),
	(1365, '2023-10-03 13:56:07.216253+00', '1466, 3749 Bill Bypass, Willmsville', '94545', 'Raymond Morissette', 'residential', 'In Progress', false),
	(1366, '2023-10-03 13:56:07.309955+00', '8056, 7094 Alan Shores, North Lisandro', '00242', 'Gregory Franecki', 'agricultural', 'Cancelled', false),
	(1367, '2023-10-03 13:56:07.383773+00', '845, 4653 Tremblay Skyway, East Amaya', '14897', 'Ms. Agnes Schoen', 'commercial', 'Cancelled', false),
	(1368, '2023-10-03 13:56:07.448333+00', '8025, 953 Alena Divide, Port Rettafort', '04165', 'Jane Wisoky', 'commercial', 'In Progress', false),
	(1369, '2023-10-03 13:56:07.530217+00', '4479, 15637 Harvey Lights, Framistead', '52123', 'Cary Schneider', 'agricultural', 'Completed', false),
	(1370, '2023-10-03 13:56:07.591219+00', '220, 6543 Pascale Hill, New Amira', '77421-0580', 'Arlene Upton', 'agricultural', 'In Progress', false),
	(1371, '2023-10-03 13:56:07.655111+00', '188, 99129 Durgan Crest, Margarettebury', '80806-5375', 'Percy Mante', 'commercial', 'Completed', false),
	(1372, '2023-10-03 13:56:07.718167+00', '4426, 711 Dare Mill, Langoshmouth', '04190', 'Elaine Schneider', 'agricultural', 'Completed', false),
	(1373, '2023-10-03 13:56:07.785289+00', '71087, 503 Colby Mills, Perth Amboy', '53680', 'Antonia Gorczany', 'commercial', 'Completed', false),
	(1374, '2023-10-03 13:56:07.860417+00', '799, 282 Laury Mews, Anderson', '62209', 'Nelson Wuckert', 'agricultural', 'Cancelled', false),
	(1375, '2023-10-03 13:56:07.936333+00', '7110, 7735 Eda Walks, Federal Way', '07868-1271', 'Allison Ankunding', 'agricultural', 'In Progress', false),
	(1376, '2023-10-03 13:56:08.001018+00', '1226, 80363 Carolyn Loop, East Carolyn', '45068-2082', 'Tommie Macejkovic', 'agricultural', 'Completed', false),
	(1377, '2023-10-03 13:56:08.067598+00', '185, 922 Marshall Crossroad, Fort Francohaven', '40013-5235', 'Dr. Jacob Doyle', 'residential', 'Completed', false),
	(1378, '2023-10-03 13:56:08.145221+00', '303, 463 Sharon Walks, South Ralph', '46783', 'Eloise Macejkovic', 'agricultural', 'Completed', false),
	(1379, '2023-10-03 13:56:08.218974+00', '57098, 59703 Lauren Knolls, Fort Guyfield', '24124-2906', 'Forrest Hodkiewicz', 'residential', 'In Progress', false),
	(1380, '2023-10-03 13:56:08.280208+00', '746, 892 Heaven Dam, Corpus Christi', '13589-1337', 'David Parisian', 'commercial', 'Cancelled', false),
	(1381, '2023-10-03 13:56:08.34246+00', '63742, 194 Collins Trail, New Faytown', '28954-8838', 'Adrienne Cole', 'residential', 'Completed', false),
	(1382, '2023-10-03 13:56:08.394766+00', '942, 9180 Hermann Squares, Coachella', '00053-7484', 'Laurence Crooks', 'commercial', 'Cancelled', false),
	(1383, '2023-10-03 13:56:08.456239+00', '18585, 251 Rempel Square, Emanuelshire', '96040-2408', 'Lynda Turcotte', 'agricultural', 'In Progress', false),
	(1384, '2023-10-03 13:56:08.519299+00', '81236, 81782 Jacobs Mountains, East Hans', '79748', 'Elsie Runte', 'residential', 'In Progress', false),
	(1385, '2023-10-03 13:56:08.596349+00', '1555, 669 Lynch Junction, Manuelaborough', '98227-9360', 'Allison Bauch', 'residential', 'In Progress', false),
	(1386, '2023-10-03 13:56:08.658282+00', '103, 12801 Rodriguez Fort, Gordonshire', '54774-6029', 'Dr. Willie Wolff', 'agricultural', 'Completed', false),
	(1387, '2023-10-03 13:56:08.739855+00', '2315, 34795 Homenick Flats, Silasfort', '06057-4030', 'Dean Herman', 'commercial', 'Completed', false),
	(1388, '2023-10-03 13:56:08.801279+00', '859, 8230 Cristopher Rest, Rebecafurt', '80232-3506', 'Andres Bode', 'residential', 'Cancelled', false),
	(1389, '2023-10-03 13:56:08.864972+00', '35907, 293 Tremblay Harbor, South Hellen', '59685-0640', 'Jonathon Little', 'agricultural', 'In Progress', false),
	(1390, '2023-10-03 13:56:08.919402+00', '3604, 6435 Pfeffer Harbor, Jasperhaven', '87069', 'Shaun Lakin', 'agricultural', 'In Progress', false),
	(1391, '2023-10-03 13:56:08.982594+00', '16825, 88683 Nader Passage, Corwinmouth', '07585', 'Jesus Sawayn', 'residential', 'In Progress', false),
	(1392, '2023-10-03 13:56:09.06182+00', '928, 79747 Schmidt Greens, Palm Bay', '42009-5017', 'Dr. Andre Kshlerin', 'agricultural', 'In Progress', false),
	(1393, '2023-10-03 13:56:09.135422+00', '800, 1170 Ward Bridge, Pharr', '68781', 'Carrie Kunde', 'agricultural', 'Completed', false),
	(1394, '2023-10-03 13:56:09.19621+00', '61243, 893 Kane Cove, South Gradyhaven', '61486-2784', 'Roberto Runolfsson', 'commercial', 'In Progress', false),
	(1395, '2023-10-03 13:56:09.30893+00', '673, 55994 Crist Lane, Louiehaven', '87222-7813', 'Vickie Schoen III', 'residential', 'Cancelled', false),
	(1396, '2023-10-03 13:56:09.372414+00', '748, 109 Vince Loaf, Feestside', '91610', 'Toby Emard-Wolff', 'agricultural', 'In Progress', false),
	(1397, '2023-10-03 13:56:09.439018+00', '570, 712 Mable Green, Chula Vista', '96267-0960', 'Claudia Auer', 'residential', 'In Progress', false),
	(1398, '2023-10-03 13:56:09.512094+00', '667, 716 George Neck, Schinnerstad', '14911-3766', 'Tricia McKenzie', 'agricultural', 'In Progress', false),
	(1399, '2023-10-03 13:56:09.589166+00', '478, 767 Hills Shoals, East Sallie', '14548', 'Monica Legros', 'commercial', 'Cancelled', false),
	(1400, '2023-10-03 13:56:09.672478+00', '9068, 91407 O''Keefe Mountains, Hutchinson', '57760-7007', 'Devin Lowe', 'residential', 'In Progress', false),
	(1401, '2023-10-03 13:56:09.747042+00', '31010, 51463 Stokes Unions, Fort Leatha', '31134', 'Bernard Fay', 'agricultural', 'Completed', false),
	(1402, '2023-10-03 13:56:09.83748+00', '700, 171 Mertz Island, Marianaville', '70416-6929', 'Alex Keeling', 'residential', 'Completed', false),
	(1403, '2023-10-03 13:56:09.915005+00', '34535, 934 Dach Track, Arnestad', '83437', 'Mrs. Thelma Jacobson', 'commercial', 'Cancelled', false),
	(1404, '2023-10-03 13:56:09.966772+00', '61668, 651 Harber Lakes, Berneicestead', '45096', 'Daniel Sauer', 'agricultural', 'Completed', false),
	(1405, '2023-10-03 13:56:10.031102+00', '23638, 9365 Beatrice Green, Denisboro', '26535-9549', 'Heidi Batz', 'commercial', 'Completed', false),
	(1406, '2023-10-03 13:56:10.111699+00', '8788, 77626 Eli Ways, South Jazmynecester', '09352-2738', 'Emanuel Moore III', 'residential', 'Cancelled', false),
	(1407, '2023-10-03 13:56:10.173622+00', '89391, 23348 Brandi Viaduct, Maureenstad', '46979-8474', 'Cecilia Schiller', 'commercial', 'Completed', false),
	(1408, '2023-10-03 13:56:10.258321+00', '109, 2739 Nader Union, Sophieland', '29156', 'Mr. Travis Bogisich', 'agricultural', 'Cancelled', false),
	(1409, '2023-10-03 13:56:10.320797+00', '7164, 1035 Fritsch Skyway, West Jacinto', '02746-5444', 'Jason Yundt II', 'agricultural', 'In Progress', false),
	(1410, '2023-10-03 13:56:10.379519+00', '70341, 7901 Kozey Ferry, Pagacton', '59343', 'Monica Lemke', 'commercial', 'Cancelled', false),
	(1411, '2023-10-03 13:56:10.518269+00', '22391, 8834 Hosea Camp, Jaskolskiside', '97318', 'Tyler Rohan', 'residential', 'Completed', false),
	(1412, '2023-10-03 13:56:10.575795+00', '991, 396 Laila Ways, Stonechester', '35261-9324', 'Terrence Runolfsson', 'agricultural', 'Cancelled', false),
	(1413, '2023-10-03 13:56:10.634118+00', '11918, 16681 Levi Circle, Kingsport', '29259', 'Sandra Brekke DVM', 'agricultural', 'Cancelled', false),
	(1414, '2023-10-03 13:56:10.701016+00', '39583, 96869 Schowalter Trace, Portage', '94041-7740', 'Miss Lela Hilpert-Mann', 'agricultural', 'Cancelled', false),
	(1415, '2023-10-03 13:56:10.760657+00', '930, 18688 Royal Springs, Menifee', '97804', 'Dixie Schmeler', 'residential', 'Cancelled', false),
	(1416, '2023-10-03 13:56:10.82388+00', '443, 356 Kulas Burgs, Amieberg', '37539', 'Leo Mayer', 'commercial', 'Completed', false),
	(1417, '2023-10-03 13:56:10.896796+00', '465, 6542 Javier Roads, Franklin', '32144', 'Douglas Bailey', 'residential', 'In Progress', false),
	(1418, '2023-10-03 13:56:10.969759+00', '7011, 3287 Wolf Highway, Gillianboro', '02070-0703', 'Freda Volkman', 'commercial', 'Completed', false),
	(1419, '2023-10-03 13:56:11.03983+00', '6985, 74980 Loyce Walk, Kirlinchester', '29283', 'Ricardo Schimmel', 'residential', 'Completed', false),
	(1420, '2023-10-03 13:56:11.109361+00', '51151, 188 Reggie Locks, Haileytown', '58691-8865', 'Richard Ratke', 'agricultural', 'Cancelled', false),
	(1421, '2023-10-03 13:56:11.177845+00', '272, 33146 Senger Place, Hicksville', '47605', 'Percy Kris', 'agricultural', 'In Progress', false),
	(1422, '2023-10-03 13:56:11.249027+00', '63036, 5988 Tobin Inlet, Quincy', '20806', 'Jesus Wiza', 'commercial', 'Cancelled', false),
	(1423, '2023-10-03 13:56:11.314417+00', '1711, 462 Kessler Ridge, Rocklin', '28160-8680', 'Kelly Carroll', 'agricultural', 'Cancelled', false),
	(1424, '2023-10-03 13:56:11.373771+00', '3303, 23208 Bernier Path, Pomona', '81369', 'Lucy Bailey', 'agricultural', 'Cancelled', false),
	(1425, '2023-10-03 13:56:11.437997+00', '5492, 517 Bernadette Trafficway, Jodyland', '59179-9966', 'Ramona Gutmann', 'residential', 'In Progress', false),
	(1426, '2023-10-03 13:56:11.498879+00', '82576, 5718 Williamson Parks, Las Vegas', '88670-6196', 'Levi Davis', 'commercial', 'Cancelled', false),
	(1427, '2023-10-03 13:56:11.562892+00', '77798, 3705 Maureen Cove, Parma', '39303-0391', 'Leslie Bahringer', 'agricultural', 'Completed', false),
	(1428, '2023-10-03 13:56:11.641019+00', '278, 15047 Josefina Cliff, North Abigayle', '29552', 'Mandy Blick I', 'agricultural', 'Completed', false),
	(1429, '2023-10-03 13:56:11.69826+00', '51293, 45859 Verdie Way, West Demarcus', '17472', 'Mr. Lynn Ortiz', 'commercial', 'Completed', false),
	(1430, '2023-10-03 13:56:11.764801+00', '67650, 15672 Leannon Mountain, West Caitlyntown', '98124-1723', 'Mr. Jared Mann', 'residential', 'In Progress', false),
	(1431, '2023-10-03 13:56:11.851299+00', '71145, 49527 Emmalee Ports, Murfreesboro', '62849', 'Alberto Nicolas', 'commercial', 'In Progress', false),
	(1432, '2023-10-03 13:56:11.913173+00', '1867, 13983 Collins Lakes, Murrayborough', '77720', 'Elsie Bednar', 'residential', 'In Progress', false),
	(1433, '2023-10-03 13:56:11.978143+00', '642, 3808 Dusty Hollow, Brentwood', '39911-4374', 'Paul Fadel', 'agricultural', 'Completed', false),
	(1434, '2023-10-03 13:56:12.04182+00', '413, 135 Garrick Cove, Fall River', '49030-9802', 'Tina Harber', 'residential', 'In Progress', false),
	(1435, '2023-10-03 13:56:12.109118+00', '3596, 2714 Ardella Mills, Aufderharshire', '31189', 'Gary Bailey Jr.', 'residential', 'Completed', false),
	(1436, '2023-10-03 13:56:12.172411+00', '641, 8485 Ewell Mills, Lewisburgh', '76023-5748', 'Hattie Paucek', 'residential', 'Completed', false),
	(1437, '2023-10-03 13:56:12.239574+00', '485, 1099 Coleman Tunnel, Juwanburgh', '24170', 'Darrel Quitzon', 'agricultural', 'Completed', false),
	(1438, '2023-10-03 13:56:12.306283+00', '205, 57768 Bauch Shore, Hamillbury', '75951', 'Mr. Carroll Rolfson', 'commercial', 'Cancelled', false),
	(1439, '2023-10-03 13:56:12.369331+00', '451, 81943 Batz Extensions, Port Edd', '38228', 'Gilbert Abernathy PhD', 'agricultural', 'Cancelled', false),
	(1440, '2023-10-03 13:56:12.442121+00', '288, 4300 Sunny Prairie, North Floburgh', '49855-1788', 'Dr. Phyllis Kiehn IV', 'agricultural', 'Cancelled', false),
	(1441, '2023-10-03 13:56:12.502904+00', '2810, 8245 Hansen Pike, Alenetown', '06967', 'Tomas Crist', 'agricultural', 'Cancelled', false),
	(1442, '2023-10-03 13:56:12.567364+00', '9674, 293 Friesen Valleys, Fort Ryleeborough', '75770-8165', 'Kevin Kassulke PhD', 'commercial', 'Completed', false),
	(1443, '2023-10-03 13:56:12.648918+00', '154, 864 Connelly Flat, South Franciscoboro', '49722-4139', 'Dr. Carmen Schmidt V', 'commercial', 'Cancelled', false),
	(1444, '2023-10-03 13:56:12.70157+00', '31600, 585 Little Forges, New Tre', '94115', 'Dr. Leland Jaskolski', 'agricultural', 'In Progress', false),
	(1445, '2023-10-03 13:56:12.761085+00', '97452, 9756 Smitham Via, Cruickshankworth', '60700-9561', 'Kimberly Jones', 'residential', 'Cancelled', false),
	(1446, '2023-10-03 13:56:12.827111+00', '79490, 8878 Padberg Manor, South Lydafort', '50402', 'Crystal Auer', 'residential', 'Cancelled', false),
	(1447, '2023-10-03 13:56:12.917195+00', '5529, 612 Trantow Dale, Weston', '79873-2643', 'Meredith Bahringer', 'residential', 'In Progress', false),
	(1448, '2023-10-03 13:56:12.981747+00', '2399, 983 Schuppe Rapids, Carterstead', '93829-8747', 'Regina Boyle-Mann', 'commercial', 'In Progress', false),
	(1449, '2023-10-03 13:56:13.056403+00', '944, 93739 Monserrate Pass, Roderickfort', '54763', 'Johanna Parker', 'commercial', 'In Progress', false),
	(1450, '2023-10-03 13:56:13.165597+00', '527, 283 Murazik Branch, Murazikstead', '08006-0131', 'Delia Robel', 'agricultural', 'In Progress', false),
	(1451, '2023-10-03 13:56:13.240633+00', '63950, 86166 Armstrong Views, West Artshire', '91754', 'Dana Leffler', 'agricultural', 'Completed', false),
	(1452, '2023-10-03 13:56:13.319482+00', '385, 494 Ward Branch, Kieraland', '23901', 'Jamie Pfannerstill-Jacobi DDS', 'commercial', 'Completed', false),
	(1453, '2023-10-03 13:56:13.418027+00', '508, 54815 Leon Overpass, Tigard', '12136-7881', 'Claudia Stoltenberg', 'residential', 'Cancelled', false),
	(1454, '2023-10-03 13:56:13.504039+00', '727, 9852 Theodore Haven, Zboncakport', '57060', 'Rosemarie Mueller', 'residential', 'In Progress', false),
	(1455, '2023-10-03 13:56:13.574593+00', '8124, 810 Dare Via, New Kyleberg', '04007', 'Benny Klein', 'residential', 'Completed', false),
	(1456, '2023-10-03 13:56:13.644051+00', '4494, 12733 Gilberto Shores, Fort Elvis', '82180-4783', 'Mrs. Judith Hintz', 'residential', 'Completed', false),
	(1457, '2023-10-03 13:56:13.72068+00', '3120, 121 Turcotte Harbors, East Adellaboro', '17354-5726', 'Eugene Conn', 'agricultural', 'Completed', false),
	(1458, '2023-10-03 13:56:13.788702+00', '959, 19499 Wisozk Turnpike, Port Jonathanchester', '99200', 'Lula Gorczany', 'agricultural', 'Completed', false),
	(1459, '2023-10-03 13:56:13.886879+00', '8855, 229 Harris Skyway, Lake Sophie', '63819-2197', 'Frederick Lindgren', 'residential', 'Cancelled', false),
	(1460, '2023-10-03 13:56:13.955347+00', '78497, 82804 Doris Garden, Lehigh Acres', '65407', 'Lila Dickens', 'residential', 'Completed', false),
	(1461, '2023-10-03 13:56:14.022184+00', '31650, 6142 Rigoberto Crossroad, Lake Eloystad', '86203', 'Carla Mertz', 'agricultural', 'Cancelled', false),
	(1462, '2023-10-03 13:56:14.086124+00', '1842, 69697 Koch Pass, Chattanooga', '61617-0412', 'Misty Tromp', 'commercial', 'Cancelled', false),
	(1463, '2023-10-03 13:56:14.162455+00', '58871, 2049 Maci Skyway, Klingfield', '03653-0866', 'Anthony O''Connell', 'commercial', 'Cancelled', false),
	(1464, '2023-10-03 13:56:14.221198+00', '869, 50717 Ryan Center, Gainesville', '41565', 'Doug Hirthe', 'commercial', 'Cancelled', false),
	(1465, '2023-10-03 13:56:14.292602+00', '553, 54341 Haven Spurs, Chicopee', '47164-7258', 'Della Kessler', 'commercial', 'Completed', false),
	(1466, '2023-10-03 13:56:14.362745+00', '20955, 816 Gwendolyn Club, Lake Orion', '19455-0065', 'Casey Beier II', 'residential', 'Cancelled', false);


--
-- Data for Name: requisitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."requisitions" ("id", "parent_id", "sequence", "query", "reply", "is_applicable", "has_doc", "is_complete", "is_flagged", "is_required", "precedent_id", "is_locked", "is_archived") OVERRIDING SYSTEM VALUE VALUES
	(100, 99, 1, 'Give the Vendor’s full name and present address.', NULL, false, false, false, false, true, 1, false, false),
	(110, NULL, 10, 'Notices', NULL, false, false, false, false, false, 1, false, false),
	(68, 64, 2, 'The Dons are out despite an impressive, hard-fought draw in Greece. Eintracht Frankfurt’s 1-0 win in Helsinki means they are seven points clear of Aberdeen in second.', NULL, false, false, false, false, true, 1, false, false),
	(101, 99, 2, 'Has the Vendor ever executed any document in relation to the property in the Irish equivalent or any other variant of his name. If so, furnish details.', NULL, false, false, false, false, true, 1, false, false),
	(112, 111, 1, 'Has any notice certificate or order been served upon or received by the Vendor or has the Vendor notice of any intention to serve any notice or issue any certificate or make any order relating to the property or any part of it under the -

Agricultural Credit Acts
Air Pollution Act
Building Control Acts
Civil Partnership and Certain Rights and Obligations of Cohabitants Act 2010
Conveyancing Acts
Derelict Sites Acts
Electricity Supply Acts
Environmental Agency Act
Finance (Local Property Tax) Acts
Fines (Payment and Recovery) Act 2014
Fire Brigade Acts
Fire Services Acts
Forestry Acts
Gas Acts
Housing Acts
Housing (Private Rented Dwellings) Acts
Labourers Acts
Land Acts
Land & Conveyancing Law Reform Acts
Landlord and Tenant Acts
Local Government (Charges) Acts
Local Government (Household Charge) Acts
Local Government (Planning and Development) Acts
Local Government (Sanitary Services) Acts
Local Government Reform Act 2014
Mineral Development Acts
Multi-Unit Developments Act 2011
National Asset Management Agency Act 2009
National Monuments Acts
Office Premises Act
Petroleum and other Minerals Development Acts
Planning and Development Acts
Public Health Acts
Registration of Title Acts
Rent Restrictions Acts
Residential Tenancies Acts
Safety in Industry Acts
Succession Act
Taxes Consolidation Acts
Urban Regeneration and Housing Act 2015
Water Pollution Act
Water Services Acts
Wildlife Act
- or under any other Act or any statutory rule order or statutory instrument', NULL, false, false, false, false, true, 1, false, false),
	(70, 64, 3, 'Thiel is not against government in principle, his friend Auren Hoffman (who is no relation to Reid) says. “The ’30s, ’40s, and ’50s—which had massive, crazy amounts of power—he admires because it was effective. We built the Hoover Dam. We did the Manhattan Project,” Hoffman told me. “We started the space program.”', NULL, false, false, false, false, true, 1, false, false),
	(67, 64, 1, 'Rishi Sunak is under growing pressure to sack Suella Braverman after she ignored Downing Street advice and published an explosive article accusing the Metropolitan police of political bias.

Amid claims that the prime minister is too weak to remove the home secretary, ministers joined with senior police officers in accusing Braverman of stoking “hatred and division” before a pro-Palestinian march on Saturday.', NULL, true, false, false, false, true, 1, false, false),
	(73, 72, 1, 'This felt like a debater’s riposte, not to be taken seriously. He had given a more honest answer before that: He told me that he no longer dwells on democracy’s flaws, because he believes we Americans don’t have one. “We are not a democracy; we’re a republic,” he said. “We’re not even a republic; we’re a constitutional republic.”', NULL, false, false, false, false, true, 1, false, false),
	(72, 67, 1, 'When I asked Thiel to explain his views on democracy, he dodged the question. “I always wonder whether people like you … use the word democracy when you like the results people have and use the word populism when you don’t like the results,” he told me. “If I’m characterised as more pro-populist than the elitist Atlantic is, then, in that sense, I’m more pro-democratic.”', NULL, false, false, false, false, true, 1, false, false),
	(91, 82, 1, 'What sort of badge', NULL, false, false, false, false, true, 1, false, false),
	(102, 99, 3, '', NULL, false, false, false, false, false, 1, false, false),
	(64, 18, 1, 'This is a heading', NULL, false, false, false, false, false, 1, false, false),
	(74, 18, 3, 'Having publicly outed Braverman as going against his orders, Sunak now finds himself in a no-win situation.', NULL, false, false, false, false, true, 1, false, false),
	(121, 119, 2, 'In the event of such certificate not being furnished on or prior to closing the Purchaser shall be bound to deduct and pay to the Revenue Commissioners 15% of the total consideration.', NULL, false, false, false, false, true, 1, false, false),
	(90, 89, 1, 'cg50', NULL, false, false, false, false, true, 1, false, false),
	(120, 119, 1, 'If the consideration exceeds the capital gains tax threshold current at the date of the contract either in this sale or in the aggregate of this and previous sales between the parties hereto furnish on closing an appropriate certificate referred to in subsection 4(b) and issued under subsection 8(a) or 8A of Section 980 of the Taxes Consolidation Act 1997 as amended.', NULL, false, false, false, false, true, 1, false, false),
	(107, 99, 4, 'The purchaser will make appropriate searches to include but not limited to the Registry of Deeds, Land Registry, Judgements (High Court Register of Judgments and Incumbrances affecting Real Estate), Bankruptcy, Register of EU Personal Insolvencies, Register of Debt Relief Notices, Register of Protective Certificates, Register of Debt Settlement Arrangements, Register of Personal Insolvency Arrangements, Bills of Sale, Sheriff’s Office, Revenue Sheriff’s Office, Sheriff’s/Receiver of Fines Office, Companies Office, and Planning Office and any acts appearing on any such search must be explained and/or discharged (where applicable) by the Vendor prior to or on closing.', NULL, false, false, false, false, true, 1, false, false),
	(114, 113, 1, 'On the death of any person on the title prior to 1 April 1975 did any reversionary interest pass.', NULL, false, false, false, false, true, 1, false, false),
	(115, 113, 2, 'If so, was payment of estate duty arising on such passing deferred.', NULL, false, false, false, false, true, 1, false, false),
	(89, 77, 1, 'capital gains', NULL, false, false, false, false, false, 1, false, false),
	(111, 110, 1, '', NULL, false, false, false, false, false, 1, false, false),
	(108, 99, 5, 'Furnish all searches in the Vendor’s possession and furnish the search provided for in the contract with a full explanation (and discharge if applicable) of any acts appearing therein.', NULL, false, false, false, false, true, 1, false, false),
	(117, 113, 3, 'If so, furnish a certificate of the subsequent discharge of such duty in any case where the reversionary interest fell into possession within six years of the date of this sale.', NULL, false, false, false, false, true, 1, false, false),
	(118, 116, 1, 'Where the title to the property or any part thereof depends on a claim of adverse possession furnish a certificate of discharge from capital acquisitions tax pursuant to Section 62 (2) of the Capital Acquisitions Tax Consolidation Act 2003 as amended by Section 128 of the Finance Act 2008.', NULL, false, false, false, false, true, 1, false, false),
	(103, 102, 1, 'Has the Vendor ever committed an act of bankruptcy or been adjudicated a bankrupt in any EU jurisdiction.', NULL, false, false, false, false, true, 1, false, false),
	(104, 102, 2, 'If so, furnish details and state if the Vendor has been discharged from bankruptcy.', NULL, false, false, false, false, true, 1, false, false),
	(105, 102, 3, 'Has the Vendor ever entered into a personal insolvency arrangement in any EU jurisdiction.', NULL, false, false, false, false, true, 1, false, false),
	(106, 102, 4, 'If so, furnish details and state if the Vendor has been discharged from insolvency.', NULL, false, false, false, false, true, 1, false, false),
	(18, NULL, 1, 'Premises', NULL, true, true, true, true, false, 1, false, false),
	(113, 97, 1, 'Estate Duty', NULL, false, false, false, false, false, 1, false, false),
	(116, 97, 2, 'Capital Acquisitions Tax', NULL, false, false, false, false, false, 1, false, false),
	(119, 97, 3, 'Capital Gains Tax', NULL, false, false, false, false, false, 1, false, false),
	(97, NULL, 2, 'Taxation', NULL, false, false, false, false, false, 1, false, false),
	(75, NULL, 3, 'Easements and Rights', NULL, false, false, false, false, true, 1, false, false),
	(77, NULL, 4, 'Tax', NULL, false, false, false, false, true, 1, false, false),
	(92, NULL, 5, 'Something New', NULL, false, false, false, false, false, 1, false, false),
	(99, NULL, 6, 'Searches', NULL, false, false, false, false, false, 1, false, false),
	(98, NULL, 7, 'January', NULL, false, false, false, false, false, 1, false, false),
	(82, NULL, 8, 'Badge', NULL, false, false, false, false, false, 1, false, false),
	(109, NULL, 9, 'Family Home Protection Act 1976 (“the 1976 Act”), Family Law Act 1995 (“the 1995 Act”), Family Law (Divorce) Act 1996 (“the 1996 Act”) and Civil Partnership CERTAIN RIGHTS AND OBLIGATIONS OF COHABITANTS ACT 2010 (“the 2010 Act”)', NULL, false, false, false, false, false, 1, false, false),
	(122, 109, 1, 'Is the property or any part thereof the Vendor’s “family home” or “shared home” as defined in either the 1976 Act, the 1995 Act, the 1996 Act or the 2010 Act.', NULL, false, false, false, false, true, 1, false, false),
	(123, 109, 2, 'If the answer to 23.1 is yes, furnish the prior written consent of the Vendor’s spouse / civil partner and verify the marriage / civil partnership by statutory declaration exhibiting therein copy civil marriage certificate / copy civil partnership registration certificate and furnish draft declaration and copy exhibit for approval.', NULL, false, false, false, false, true, 1, false, false);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: precedents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."precedents_id_seq"', 4, true);


--
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."properties_id_seq"', 1466, true);


--
-- Name: requisitions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."requisitions_id_seq"', 123, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
