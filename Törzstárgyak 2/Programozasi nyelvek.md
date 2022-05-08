# Programozási nyelvek

## A programozási nyelvek csoportosítása (paradigmák), az egyes csoportokba tartozó nyelvek legfontosabb tulajdonságai.

### Nyelvcsoportok (paradigmák)

- Imperatív, procedurális (pl.: C, C++, Pascal)

- Objektum orientált (pl.: C++, Java, Smalltalk)

- Applikatív, funkcionális (pl.: Haskell, ML)

- Szabály alapú, logikai (pl.: Prolog, HASL)

- Párhuzamos (pl.: Occam, PVM, MPI)

### Imperatív programozás

- Az imperatív programozás olyan programozási paradigma, amely utasításokat használ, hogy egy program állapotát megváltoztassa.

- A kifejezést gyakran használják a deklaratív programozással ellentétben, amely arra összpontosít, hogy a program *mit* érjen el, anélkül, hogy meghatározná, hogy a program *hogyan* érje el az eredményt.

- Azok a nyelvek, melyek az imperatív paradigmákba esnek két fő jellemzőjük van: meghatározzák a műveletek sorrendjét olyan konstrukciókkal, amelyek kifejezetten ellenőrzik ezt a sorrendet, és lehetővé tesznek olyan mellékhatásokat, amelyben az állapot módosítható egy időben, egy kód egységben, majd később egy másik időpontban olvasható egy másik kód egységén belül.

- A legkorábbi imperatív nyelvek az eredeti számítógépek gépnyelvei voltak (assembly)
  
  - egyszerű utasítások -> könnyebb hardwares megvalósítás, de az összetett programok létrehozása nehezebb

**Procedurális programozás**

- A megoldandó programozási feladatot kisebb egységekből, avagy eljárásokból (angolul: procedure) építi fel

- Ezek az eljárások a programnyelv kódjában általában jól körülhatárolt egységek (függvény, rutin, szubrutin, metódus – az elnevezés az adott programozási nyelvtől függ), amelyeknek van elnevezésük és jellemezhetik őket paraméterek és a visszatérési értékük.

- A programok futtatása során gyakorlatilag a főprogramból ezek az eljárások kerülnek sorozatosan meghívásra. Meghíváskor meghatározott paraméterek átadására kerül sor, az eljárás pedig a benne meghatározott logika eredményeként általában valamilyen visszatérési értéket ad vissza, aminek függvényében a főprogram további eljáráshívásokat végezhet.

- Az objektum orientált paradigmával szemben itt háttérbe szorulnak a komplex adatszerkezetek

- Moduláris tervezés
  
  - Dekompozíció: adott feladat több egyszerűbb részfeladatra bontása
  
  - Kompozíció: meglévő programegységek újrafelhasználása
  
  - Érthetőség: a modulok önmagukba is egy értelmes egységet alkossanak
  
  - Folytonosság: a specifikáció kis változása esetén is csak kis változás legyen szükséges a programban
  
  - Védelem: egy hiba csak egy (vagy maximum egy pár), modul működésére legyen hatással, ezzel védve a program egészét

- Modularitás alapelvei:
  
  - Nyelvi támogatás: a modulok külön-kölün legyenek lefordíthatók
  
  - Kevés kapcsolat: a modulok keveset kommunikáljanak egymással
  
  - Gyenge kapcsolat: ha két modulnak kommunikálnia kell egymással, akkor csak annyi információt cseréljenek, amennyi szükséges
  
  - Explicit interfészek: ha két modul kommunikál, akkor legalább az egyikük szövegéből ki kell hogy derüljön
  
  - Információ-elrejtés: egy modulnak csak az explicit módon nyilvánossá tett információit használhatjuk fel
  
  - Nyitott és zárt modulok
    
    - Zárt modul: csak változatlan formában kerülhet felhasználásra
    
    - Nyitott modul: kiterjeszthető, más szóval bővíthető az általa nyújtott szolgáltatások száma
  
  - Újrafelhasználhatóság: ugyanazokat a programeleket ne kelljen többször elkészíteni, ügyeljünk viszonylag általánosítható modulok készítésére
  
  - Típus változatossága: modulok működjenek többféle típusra
  
  - Adatszerkezetek és algoritmusok változatossága: például egy lineáris kereső eljárás működjön több féle adatszerkezetre (ezeken belül persze más-más algoritmusokkal)
  
  - Egy típus - egy modul: egy típus műveletei kerüljenek egy modulba
  
  - Reprezentáció függetlenség: egy adattípus reprezentációjának a megváltozása ne okozzon modulon kívüli változást

- Procedurális programozási nyelvek pédául a *C*, *Pascal*, *FORTRAN*

**Objektum orientált programozás**

- Az objektum orientált programozás az objektumok fogalmán alapuló programozási paradigma

- Az objektumok egységbe foglalják az adatokat és a hozzájuk tartozó műveleteket (egységbe zárás).

- A program egymással kommunikáló objektumok összességéből áll.

- A legtöbb objektumorientált nyelv osztály alapú, azaz az objektumok osztályok példányai, és típusuk az osztály.

- Objektumok és osztályok
  
  - Osztályok: 
    
    - Az adatformátum és az elérhető metódusok definíciója az adott típus vagy a típushoz tartozó objektumok számára.
    - Tartalmazhatnak adattagokat és metódusokat, amelyek műveleteket végeznek az osztály adattagjain. 
    - Összetartozó adatok és függvények, eljárások egysége.
  
  - Objektumok: 
    
    - Az osztály példányai.
    
    - Gyakran megfeleltethetők a való élet objektumainak vagy egyedeinek.

- Pár fontos fogalom:
  
  - Osztályváltozók: az osztályhoz tartoznak, elérhetők az osztályon, de példányokon keresztül is. Minden példány számára ugyanaz.
  
  -  Attribútumok: az egyedi objektumok jellemzői, minden objektumnak sajátja van.
  
  - Tagváltozók: az osztály- és a példányváltozók együttese
  
  - Osztálymetódusok: osztály szintű metódusok, csak az osztályváltozókhoz és paramétereikhez férhetnek hozzá, példányváltozókhoz nem.
  
  - Példánymetódusok: példány szintű metódusok, hozzáférnek az adott példány összes adatához és metódusához, és paramétereik is lehetnek.

- Kompozíció, öröklődés, interfészek
  
  - Kompozíció: az objektumok lehetnek más objektumok mezői
  
  - Öröklődés:
    
    - Osztályok közötti alárendeltségi  viszony, majdnem minden osztály alapú nyelv támogatja
    
    - Ha az A osztályból örökldődik a B osztály, akkor B egyben az A osztály példánya is lesz, ezért megakpja az A osztály összes adattagját és metódusát
    
    - Több programozási nyelv megengedi a többszörös öröklődést
    
    - Egyes nyelvekben, mint a Java és a C# megtiltható a leszármazás egyes osztályokból (Javában final, C#-ban sealed a kulcsszó)
  
  - Interfészek:
    
    - Nem tartalmazhatnak megvalósítási részleteket, csak előírhatják bizonyos metódusok jelenlétét, illetve konstansokat definiálhatnak.
    
    - Olyan nyelvekben, ahol nincs a megvalósítások többszörös öröklődése, interfészekkel érhető el a többszörös öröklés korlátozott formája

- Objektum orientált nyelvek például a *Java*, *C#*, *Python*, *Smalltalk*

### Dekleratív programozás

- A specifikáción van a hangsúly, funkcionális esetben a program egy függvény kiszámítása, logikai esetben a megoldás megkeresését a futtató környezetre  bízzuk

- Azok a nyelvek, amely ezt a programozást használják, megpróbálják minimalizálni vagy kiküszöbölni a mellékhatásokat, úgy, hogy leírják, hogy a programnak mit kell elérnie a probléma tartományában, ahelyett, hogy a programozási nyelv primitívjeinek sorozataként írná le, hogyan kell azt megvalósítani

- Deklaratív nyelvek közé tartoznak az adatbázis-lekérdezési nyelvek (pl. SQL, XQuery), a reguláris kifejezések, a logikai programozás, a funkcionális programozás és a konfigurációkezelő rendszerek

**Funkcionális (applikatív)  programozás**

- A funkcionális programnyelvek a programozási feladatot egy függvény kiértékelésének tekintik

- Ugyanannak a feladatnak a megoldására funkcionális nyelven írt programkód általában lényegesen rövidebb, olvashatóbb és könnyebben módosítható, mint az imperatív nyelven kódolt programszöveg, mivel nem léteznek benne változók

- A *rekurzió* a funkcionális programozás egyik fontos eszköze, az ismétlések és ciklusok helyett rekurziót alkalmazhatjuk.

- Rekurziós függvény:
  
  - Rekurzív hívás mindig feltételvizsgálat  mögött
  
  - Rekuzív függvényt két esetre kell felkészíteni
    
    - Bázis eset: nem kell újra meghívnia magát
    
    - Rekurzív eset: Meghívja magát újra
  
  - Biztosítani kell, hogy mindig elérjük a bázis esetet
  
  - Rekurzió speciális esete: iteráció

- Alapjául a Church által kidolgozott lambda-kalkulus szolgál, a tisztán funkcionális nyelvek a matematikában megszokott függvényfogalmat valósítják meg.
  
  - Az ilyen programozás során a megoldandó feladatnál az eredményhez vezető út nem is biztosan ismert, a program végrehajtásához csupán az eredmény pontos definíciója szükséges.
  
  - Tisztán funkcionális programozás esetén tehát nincs állapot és nincs értékadás.

- Funkcionális nyelvek például a *Haskell* és *Scala*

**Logikai programozás**

- A logikai program egy modellre vonatkozó állítások (*axiómák*) egy sorozata

- Az állítások a modell objektumainak tulajdonságait és kapcsolatait, szaknyelven *relációit* írják le

- Az állítások egy adott relációt meghatározó részhalmazát predikátumnak nevezzük
  
  - A program futása minden esetben egy az állításokból következő tétel konstruktív bizonyítása, azaz a programnak feltett *kérdés* vagy más néven *cél* megválaszolása

- Az első logikai programozási nyelv a Prolog volt
  
  - Egy Prolog program csak az adatokat és az összefüggéseket tartalmazza. 
    Kérdések hatására a  “programvégrehajtást” beépített  következtető-rendszer végzi
  
  - Programozás Prologban:
    
    - Objektumok és azokon értelmezett relációk megadása
    
    - Kérdések megfogalmazása a relációkkal kapcsolatban
  
  - A programnak meg kell adnunk egy célformulát (célklózt), ezután a program ellenőrzi, hogy a célklóz a logikai (forrás)program logikai következményei közt van-e
  
  - Gyakran használják mesterségesintelligencia-alkalmazások megvalósítására, illetve a számítógépes nyelvészet eszközeként

### Párhuzamos programozás

- Egyszerre több szálon történik a  végrehajtás

- Végrehajtási szál: folyamat (process)

- Előnyei:
  
  - Természetes kifejezésmód
  
  - Sebességnövekedés megfelelő hardver  esetén

- Hátrányai
  
  - Bonyolultabb a szekvenciálisnál

- A párhuzamos programok alapvetően nem determinisztikusak

- Sokféle párhuzamos programozási  modell van

- Közös problémák:
  
  - Adathozzáférés folyamatokból
    
    - Közös memória (shared memory)
    
    - Osztott memória (distributed memory) +  kommunikáció
  
  - Folyamatok létrehozása, megszüntetése,  kezelése
  
  - Folyamatok együttműködése (interakciója)
    
    - Független
    
    - Erőforrásokért versengő

- A párhuzamos program:
  
  - Sebességfüggő: a folyamatok relatív  sebessége minden futáskor más lehet
  
  - Nemdeterminisztikus: ugyanarra az  inputra különböző output
  
  - Holtpont (deadlock): kölcsönös  egymásra várakozás
  
  - Éhezés (starvation): Nincs holtpont,  egy folyamat mégsem jut hozzá az  erőforrásokhoz

- Occam
  
  - Imperatív, folyamatok saját  memóriával rendelkeznek,  üzenetküldéssel kommunikálnak
  
  - Occam program részei:
    
    - Változók
    
    - Folyamatok
      
      - Elindul -> csinál valamit -> befejeződik (terminál)
      
      - Befejeződés helyett holtpontba is kerülhet, erre különös figyelmet kell 
        fordítani
      
      - Elemi és összetett folyamato
    
    - Csatornák: két folyamat közötti adatátvitelre szolgál
