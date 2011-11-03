--
-- Dumping data for table `informational_system`
--

INSERT INTO `informational_system` (`id`, `code`, `name`) VALUES
(2, 'IS1', 'Finansų apskaitos ir valdymo'),
(3, 'IS2', 'Išmokų vykdymo'),
(4, 'IS3', 'Kontrolės su registrais'),
(5, 'IS4', 'Skolininkų valdymo'),
(6, 'IS5', 'Duomenų analizės'),
(7, 'IS6', 'Dokumentų valdymo'),
(8, 'IS7', 'Vaizdų kaupimo ir analizės'),
(9, 'IS8', 'Patikros užduočių planavimo'),
(10, 'IS9', 'Patikros užduočių vykdymo'),
(11, 'IS10', 'Vidaus audito sistema');

--
-- Dumping data for table `support_category`
--

INSERT INTO `support_category` (`id`, `name`) VALUES
(2, 'Aplinkos ir kraštovaizdžio gerinimas'),
(3, 'Gyvenimo kokybė kaimo vietovėse ir kaimo ekonomikos įvairinimas'),
(1, 'Žemės, maisto ūkio ir miškininkystės sektoriaus konkurencingumo didinimas'),
(4, '„Leader“  metodu įgyvendinamos priemonės');

--
-- Dumping data for table `support_type`
--

INSERT INTO `support_type` (`id`, `code`, `name`, `support_category_id`) VALUES
(1, 'p1-1', 'Profesinio mokymo ir informavimo veikla', 1),
(2, 'p1-2', 'Naudojimasis konsultavimo paslaugomis', 1),
(3, 'p1-3', 'Jaunųjų ūkininkų įsikūrimas', 1),
(4, 'p1-4', 'Ankstyvas pasitraukimas iš prekinės žemės ūkio gamybos', 1),
(5, 'p1-5', 'Pusiau natūrinis ūkininkavimas', 1),
(6, 'p1-6', 'Žemės ūkio valdų modernizavimas', 1),
(7, 'p1-7', 'Miškų ekonominės vertės didinimas', 1),
(8, 'p1-8', 'Žemės ūkio ir miškininkystės plėtra ir pritaikymo infrastruktūra ', 1),
(9, 'p1-9', 'Žemės ūkio produktų perdirbimas ir pridėtinės vertės didinimas', 1),
(10, 'p1-10', 'Dalyvavimas maisto kokybės schemose', 1);