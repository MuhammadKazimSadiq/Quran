export default {
  name: "seed_chapters_table",
  type: "seeder",
  query: `INSERT INTO "chapters" ("id", "name", "page", "verses_count", "translation", "revelation_place") VALUES
    (1, 'فاتحه', '1', 7, 'فاتحه', 'makki'),
    (2, 'بقره', '2', 286, 'گاو', 'madani'),
    (3, 'آل عمران', '50', 200, 'خاندان عمران', 'madani'),
    (4, 'نساء', '77', 176, 'زن ها', 'madani'),
    (5, 'مائده', '106', 120, '', 'madani'),
    (6, 'انعام', '128', 165, NULL, 'makki'),
    (7, 'اعراف', '151', 206, NULL, 'makki'),
    (8, 'انفال', '177', 75, NULL, 'madani'),
    (9, 'توبه', '187', 129, NULL, 'madani'),
    (10, 'یونس', '208', 109, NULL, 'makki'),
    (11, 'هود', '221', 123, NULL, 'makki'),
    (12, 'یوسف', '235', 111, NULL, 'makki'),
    (13, 'رعد', '249', 43, NULL, 'madani'),
    (14, 'ابراهیم', '255', 52, NULL, 'makki'),
    (15, 'حجر', '262', 99, NULL, 'makki'),
    (16, 'نحل', '267', 128, NULL, 'makki'),
    (17, 'اسراء', '282', 111, NULL, 'makki'),
    (18, 'کهف', '293', 110, NULL, 'makki'),
    (19, 'مریم', '305', 98, NULL, 'makki'),
    (20, 'طه', '312', 135, NULL, 'makki'),
    (21, 'انبیاء', '322', 112, NULL, 'makki'),
    (22, 'حج', '332', 78, NULL, 'madani'),
    (23, 'مومنون', '342', 118, NULL, 'makki'),
    (24, 'نور', '350', 64, NULL, 'madani'),
    (25, 'فرقان', '359', 77, NULL, 'makki'),
    (26, 'شعراء', '367', 227, NULL, 'makki'),
    (27, 'نمل', '377', 93, NULL, 'makki'),
    (28, 'قصص', '385', 88, NULL, 'makki'),
    (29, 'عنکبوت', '396', 69, NULL, 'makki'),
    (30, 'روم', '404', 60, NULL, 'makki'),
    (31, 'لقمان', '411', 34, NULL, 'makki'),
    (32, 'سجده', '415', 30, NULL, 'makki'),
    (33, 'احزاب', '418', 73, NULL, 'madani'),
    (34, 'سبا', '428', 54, NULL, 'makki'),
    (35, 'فاطر', '434', 45, NULL, 'makki'),
    (36, 'یس', '440', 83, NULL, 'makki'),
    (37, 'صافات', '446', 182, NULL, 'makki'),
    (38, 'ص', '453', 88, NULL, 'makki'),
    (39, 'زمر', '458', 75, NULL, 'makki'),
    (40, 'غافر', '467', 85, NULL, 'makki'),
    (41, 'فصلت', '477', 54, NULL, 'makki'),
    (42, 'شوری', '483', 53, NULL, 'makki'),
    (43, 'زخرف', '489', 89, NULL, 'makki'),
    (44, 'دخان', '496', 59, NULL, 'makki'),
    (45, 'جاثیه', '499', 37, NULL, 'makki'),
    (46, 'احقاف', '502', 35, NULL, 'makki'),
    (47, 'محمد', '507', 38, NULL, 'madani'),
    (48, 'فتح', '511', 29, NULL, 'madani'),
    (49, 'حجرات', '515', 18, NULL, 'madani'),
    (50, 'ق', '518', 45, NULL, 'makki'),
    (51, 'ذاریات', '520', 60, NULL, 'makki'),
    (52, 'طور', '523', 49, NULL, 'makki'),
    (53, 'نجم', '526', 62, NULL, 'makki'),
    (54, 'قمر', '528', 55, NULL, 'makki'),
    (55, 'الرحمن', '531', 78, NULL, 'madani'),
    (56, 'واقعه', '534', 96, NULL, 'makki'),
    (57, 'حدید', '537', 29, NULL, 'madani'),
    (58, 'مجادله', '542', 22, NULL, 'madani'),
    (59, 'حشر', '545', 24, NULL, 'madani'),
    (60, 'ممتحنه', '549', 13, NULL, 'madani'),
    (61, 'صف', '551', 14, NULL, 'madani'),
    (62, 'جمعه', '553', 11, NULL, 'madani'),
    (63, 'منافقون', '554', 11, NULL, 'madani'),
    (64, 'تغابن', '556', 18, NULL, 'madani'),
    (65, 'طلاق', '558', 12, NULL, 'madani'),
    (66, 'تحریم', '560', 12, NULL, 'madani'),
    (67, 'ملک', '562', 30, NULL, 'makki'),
    (68, 'قلم', '564', 52, NULL, 'makki'),
    (69, 'حاقه', '566', 52, NULL, 'makki'),
    (70, 'معارج', '568', 44, NULL, 'makki'),
    (71, 'نوح', '570', 28, NULL, 'makki'),
    (72, 'جن', '571', 28, NULL, 'makki'),
    (73, 'مزمل', '574', 20, NULL, 'makki'),
    (74, 'مدثر', '575', 56, NULL, 'makki'),
    (75, 'قیامه', '577', 40, NULL, 'makki'),
    (76, 'انسان', '578', 31, NULL, 'madani'),
    (77, 'مرسلات', '580', 50, NULL, 'makki'),
    (78, 'نبا', '582', 40, NULL, 'makki'),
    (79, 'نازعات', '583', 46, NULL, 'makki'),
    (80, 'عبس', '585', 42, NULL, 'makki'),
    (81, 'تکویر', '586', 29, NULL, 'makki'),
    (82, 'انفطار', '587', 19, NULL, 'makki'),
    (83, 'مطففین', '587', 36, NULL, 'makki'),
    (84, 'انشقاق', '589', 25, NULL, 'makki'),
    (85, 'بروج', '590', 22, NULL, 'makki'),
    (86, 'طارق', '591', 17, NULL, 'makki'),
    (87, 'اعلی', '591', 19, NULL, 'makki'),
    (88, 'غاشیه', '592', 26, NULL, 'makki'),
    (89, 'فجر', '593', 30, NULL, 'makki'),
    (90, 'بلد', '594', 20, NULL, 'makki'),
    (91, 'شمس', '595', 15, NULL, 'makki'),
    (92, 'لیل', '595', 21, NULL, 'makki'),
    (93, 'ضحی', '596', 11, NULL, 'makki'),
    (94, 'شرح', '596', 8, NULL, 'makki'),
    (95, 'تین', '597', 8, NULL, 'makki'),
    (96, 'علق', '597', 19, NULL, 'makki'),
    (97, 'قدر', '598', 5, NULL, 'makki'),
    (98, 'بینه', '598', 8, NULL, 'madani'),
    (99, 'زلزله', '599', 8, NULL, 'madani'),
    (100, 'عادیات', '599', 11, NULL, 'makki'),
    (101, 'قارعه', '600', 11, NULL, 'makki'),
    (102, 'تکاثر', '600', 8, NULL, 'makki'),
    (103, 'عصر', '601', 3, NULL, 'makki'),
    (104, 'همزه', '601', 9, NULL, 'makki'),
    (105, 'فیل', '601', 5, NULL, 'makki'),
    (106, 'قریش', '602', 4, NULL, 'makki'),
    (107, 'ماعون', '602', 7, NULL, 'makki'),
    (108, 'کوثر', '602', 3, NULL, 'makki'),
    (109, 'کافرون', '603', 6, NULL, 'makki'),
    (110, 'نصر', '603', 3, NULL, 'madani'),
    (111, 'مسد', '603', 5, NULL, 'makki'),
    (112, 'اخلاص', '604', 4, NULL, 'makki'),
    (113, 'فلق', '604', 5, NULL, 'makki'),
    (114, 'ناس', '604', 6, NULL, 'makki');`,
};