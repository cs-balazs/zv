## Mesterséges Intelligencia 1.

### 1. Keresési feladat: feladatreprezentáció, vak keresés, informált keresés, heurisztikák. Kétszemélyes zéró összegű játékok: minimax, alfa-béta eljárás. Korlátozás kielégítési feladat.

#### Keresési feladat

A feladatkörnyezetről feltételezzük, hogy *diszkrét*, *statikus*, *determinisztikus*, és *teljesen megfigyelhető*.

##### Feladatreprezentáció

Következőekkel modellezzük a feladatot:

- **Lehetséges állapotok*** halmaza

- Egy **kezdőállapot**

- **Lehetséges cselekvések*** halmaza

- Egy **állapotátmenet függvény**: Minden állapothoz rendel egy **(cselekvés, állapot)** típusó, rendezett párokból álló halmazt.

- Állapotátmenet **költségvüggvénye**, amely minden lehetséges állapot-cselekvés-állapot hármashoz egy $c(x, a, y)$ valós nemnegatív költségértéket rendel

- **Célállapotok** halmaza

Ez egy gúlyozott gráfot definiál, amiben a **csúcsok az állapotok**, **élek a cselekvések**, **súlyok a költségek**.

Ez a gráf az **állapottér**

**Út**: Állapotok cselekvésekkel összekötött sorozata.

##### Vak (informálatlan) keresés

**Cél**: Adott kezdőállapotból megtalálni egy minimális költségű utat egy célállapotba.

> Ez azért nem egy triviális, legrövidebb út keresési feladat, mert az állapottér nem mindig adott teljes egészében, mert nem mindig véges.

**Megvalósítás**: **Keresőfával**, azaz a kezdőállapotból növesztünk egy fát a szomszédos állapotok hozzávételével amíg célállapotot nem találunk.

> Keresőfe nem azonos az állapottérrel! Hiszen az állapottér nem is feltétle fa.

Keresőfa egy csúcsában tárolt információ:

- Szülő

- Állapot

- Cselekvés, ami a szülőből ide vezetett

- Útköltség a kezdőállapottól eddig

- Mélység (kezdőállapoté nulla)

###### Általános, absztrakt eljárás

```
fakereses() {
    perem = { újcsúcs(kezdőállapot) }
    while perem.nemüres() {
        csúcs = perem.elsőkivesz()
        if csúcs.célállapot() {
            return csúcs
        }
        perem.beszúr(csúcs.kiterjeszt())
    }
    throw Error
}
```

> Ha olyan csúcsot szúrunk be, aminek állapota már szerepel a `perem`-ben, akkor a nagyobb költségűt felesleges benne hagyni.

- `csúcs.kiterjeszt()`: Létrehozza a csúcsból elérhető összes állapothoz tartozó keresőfa csúcsot, a mezőket megfelelően inicializálja.

- `perem`: Egy prioritási sor.

- `perem.elsökivesz()`: Ez definiálja a bejárás stratégiáját. (Lényegében a prioritási sorban a kulcsok rendezésének módja.)

###### Szélességi keresés

**FIFO** perem.

- Teljes, minden véges számú állapot érintésével elérhető állapotot véges időben elér.

- Általában nem optimális, de akkor pl. igen, ha a költség a mélység nem csökkenő függvénye.

- Időigény = Tárigény = $O(b ^{d + 1} )$
  
  > Exponenciális komplexitás miatt nem skálázódik nagy $d$-kre.

> $b$: szomszédok maximális száma.
> 
> $d$: legkisebb mélységű célállapot mélysége a keresőfában.

###### Mélységi keresés

**LIFO** perem.

- Teljes, ha a keresési fa véges mérezű. Egyébként nem.

- Nem optimális.

- Időigény: $O(b^m)$, Tárigény: $O(bm)$
  
  > Az időigény nagyon rossz, tárigény jó, mert nem exponenciális.

> $m$: keresőfa maximális mélysége.

###### Iteratívan mélyülő keresés

**Mélységi keresések** sorozata 1, 2, 3 srb. **mélységekre korlátozva**, amíg célállapotot nem találunk.

- Teljesség és optimalitás a szélességi kereséssel egyezik meg.

- Időigény: $O(b^d)$
  
  > Általában jobb, mint a szélességi

- Tárigény: $O(bd)$
  
  > Jobb, mint a mélységi

Meglepő, de igaz, hogy annak ellenére, hogy az első szinteket újra, meg újra bejárjuk, javítunk.

Ez a **legjobb informálatlan kereső**.

###### Egyenletes költségű keresés

Költség alapján rendezi a permet, először a legkisebb útiköltségű csúcsot fejtjük ki.

###### Gráflekeresés

Ha nem fa az állapottér.

Ha a kezdőállapotból több út is vezet egy állapotba, akkor a fakeresés végtelen ciklusba eshet, de legalábbis a hatékonysága drasztikusan csökken.

**Cél**: Ugyan azon állapotba vezető útak redundáns tárolásának elkerülése.

**Zárt halmaz**: Ebbe **tároljuk** a peremből **már egyszer kivett** csúcsokat.

```
gráfkereses() {
    perem = { újcsúcs(kezdőállapot) }
    zárt = { }
    while perem.nemüres() {
        csúcs = perem.elsőkivesz()
        if csúcs.célállapot() {
            return csúcs
        }
        zárt.hozzáad(csúcs)
        perem.beszúr(csúcs.kiterjeszt() - zárt)
    }
    throw Error
}
```

Mi van, ha egy zárt halmazban levő csúcshoz **találnánk jobb megoldást**?

- Egyenletes költségű kereséskor nincs ilyen eset, mert az úgy pont Djikstra algoritmusa az állapottérre.

- Mélységi keresésnél előfordulhat ilyen, ekkor át kell linkelni a zárt halmazban tárolt csúcsot a jobb út felé. 
  
  > Ez csak annyi, hogy frissítjük a szülőt, mélységet, költséget, és cselekvést?

##### Informált keresés

Az eddigi algoritmusok nem fogtak semmit arról, hogy merre haladnak tovább.

Heurisztika: Minden állapotból megbeszülni, hogy mekkora az optimális út költsége az adott állapotból egy célállapotba. Ez alapján tudjuk kiválasztani, merre érdemes haladni.

> Például útvonal-tervezési probléma esetén jó heurisztika lehet a légvonal-beli távolság.

$h(n)$: **Optimális** költség **közelítése** $n$ **állapotból** a legközelebbi **célállapotba**.

$g(n)$: **Tényleges** költség a **kezdőállapozból** $n$-be.

###### Mohó legjobb-először

A peremben rendezést $h$ alapján végezzük, a legkisebb értékű csúcsot vesszük ki.

$h(n) = 0$, ha $n$ célállapot feltételezése mellett:

- Teljes, ha a keresési fa véges mélységű

- Nem optimális

- Időigény = Tárigény = $O(b^m)$

> Jó $h$-val javítható ez a komplexitás

###### $A^*$

A peremben a rendezést $f() = h() + g()$ alapján végezzük, a legkisebb értékűt vesszük ki.

> A teljes út költségét becsüli.

**Teljesség és optimalitás**

$h$ **elfogadható** (megengedhető): Ha nem ad nagyobb értéket, mint a tényleges optimális érték, azaz **nem becsül túl**.

Fakeresés esetén ha $h$ elfogadható, és a keresési fa véges, akkor az $A^*$ optimális.

$h$ **konzisztens** (monoton): Ha $h(n) \le c(n, a, n') + h(n~)$ minden $n$-re, és $n$ minden $n'$ szomszédjára.

Gráfkeresés esetén ha $h$ konzisztens, és az állapottér véges, akkot az $A^*$ optimális.

**Hatákonyság**

Az $A^*$ optimálisan hatékony, hiszen csak azokat a csúcsokat terjeszti ki, amelyekre $f() < C^*$ ($C^*$ az optimális költség).

> Bár ezeket minden optimális algoritmusnak ki kell terjeszteni.

A tárigény általában exponenciális, de nagyon függ $h$-tól (ha $h = h^*$, akkor konstans).

Időigény szintén erősen függ $h$-tól.

###### Egyszerűsített memóriakorlátozott $A^*$

Próbáljuk meg az összes rendelkezésre álló memóriát használni, és kezeljük le, ha elfogy.

Futtassuk az $A^*$-ot amíg van memória, ha elfogyott:

- Töröljük a legrosszabb levelet a keresőfában, egyezés esetén a régebbit.

- A törölt csúcs szülőjében jegyezzük meg az innen elérhető ismert legjobb költséget (így később vissza lehet ide térni, ha minden többi útról kiderülne, hogy rosszabb)

Teljes, ha a legkisebb mélységű célállapot mélységényi csúcs belefér a memóriába egyszerre. (Tehát az oda vezető egész út.)

Hasonló költségű utak esetén előfordulhat, hogy ugrál a két út közt, így lassan talál megoldást.

###### Relaxáció

Feltételek elhagyása.

Például a 8-kirakós játék esetén
![ ](../img/kirakos.png)

- $h_1$: Rossz helyen lévő számok, ábrán 8
  
  - Relaxáció: Minden szám egyből a helyére rakható

- $h_2$: Manhattan távolság számonként, ábrán 18
  
  - Relaxáció: Minden szám tolható a szomszédba, akkor is ha van ott másik szám

- $h_{opt}$: Optimális költségek, ábrán 26

Észervétel: $\forall n : h_1(n) \le h_2(n)$, azaz $h_2$ **dominálja** $h_1$-et.

A relaxált probléma optimális költsége $\le$ az eredeti probléma optimális költségénél, mivel az eredeti probléma állapottere része a relaxáltnak (mivel pl az hogy akkor is léphetünk szomszédba, ha foglalt, növeli az állapotteret). Tehát **elfogadható heurisztikát kapunk**.

> Konzisztens is

###### Relaxálás automatizálása

Ha formális kifejezés adja meg a lehetséges lépéseket a probléma lehetséges állapotairól, akkor automatikusan elhagyhatunk feltételeket, pl. 8-kirakó esetében formálisan:

1. Egy számot csak szomszédos pozícióra lehet mozgatni, és

2. Egy számot csak üres pozícióba lehet mozgatni

Ha elhagyjuk mindkét szabályt, akkor $h_1$-et kapjuk.

Ha csak a 2-es szabályt hagyjuk el, kkor pedig $h_2$-t.

###### Több heurisztika kombinálása

$h(n) = max(h_1(n), ..., h_k(n))$

Ha igaz, hogy minden $i$-re $h_i$ konzisztens, akkor $h$ is konzisztens.

#### Kétszemélyes zéró összegű játékok

##### Kétszemélyes, lépésváltásos, determinisztikus, zéró-összegű játék

- Lehetséges állapotok halmaza
  
  - Legális játékállások

- Egy kezdőállapot

- Lehetséges cselekvések halmaza

- Állapotátmenet függvény

- Célállapotok

- Hasznosségfüggvény: Célállapozhoz hasznosságot rendel

Ez a **játékgráf** (jellemzően nem fa)

Két **ágens** van, felváltva lépnek.

- **MAX játékos**: Maximalizálni akarja a hasznosság függvényt.

- **MIN játékos**: Minimalizálni akarja a hasznosság függvényt.

> Konvenció: MAX kezd

Első célállapot elérésekor a játéknak vége.

Zéró összegű játék: Modellünkben MIN minimalizálja a hasznosságot, lényegében maximalizálja a negatív hasznosságot. Így lényegében a MIN játékis hasznosságfüggvénye a MAX játékosénak -1-szerese, innen az elnevezés, mert a kettő összege nulla.

Példa az amőba játék játékgráfjára

![ ](../img/tictactoe.png)

##### Minimax algoritmus

Tökéletesen racionális hipotézis: Tfh. mindkét játékos a teljes játékgráfot ismeri, tetszőlegesen komplex számításokat tud elvégezni, és nem hibázik.

Stratégia: Minden állapotra meghatározza, hogy melyik lépést kell választani.

Minmax a következőeket számolja minden $n$ csúcsra:

![ ](../img/minimax.png)

```c
maxErtek(n) {
    if végállapot(n) return hasznosság(n)
    max = -végtelen
    for a in n szomszédai {
        max = max(max, minÉrték(a)) // Itt a MIN játékos lép!
    }
    return max
}
```

```c
minErtek(n) {
    if végállapot(n) return hasznosság(n)
    min = végtelen
    for a in n szomszédai {
        min = min(min, maxÉrték(a)) // Itt a MAX játékos lép!
    }
    return min
}
```

 Az eljárás `maxErtek(kezdőállapot)` hívással indul, hiszen a MAX játékos kezd.

Ha van a játékgráfban köt, akkor nem terminál. Ez a gyakorlatban azért nem probléma, mert csak adott mélységig futtatjuk.

> Sok játék esetén a szabályok kizárják a végtelenségig futó köröket.

A minmax érték az optimális hasznosság, amit az adott állapotból el lehet érni, ha az ellenfél tökéletesen racionális.

##### Alfa-béta vágás

Ha tudjuk, hogy MAX egy adott csúcs rekurzív kiértékelése közben talált olyan stratégiát, amellyel ki tud kényszeríteni pl. 10 értékű hasznosságot az adott csúcsban, akkot a csúcs további kiértékelése közben nem kell vizsgálni olyan állapotokat, amelyekben MIN ki tud kényszerítani $\le$ 10 hasznosságot, hiszen tudjuk, hogy MAX sosem fogja ide engedni a játékot.

Új paraméterek:

- **Alfa**: **MAX-nak** már felfedeztünk egy olyan stratégiát, amely **alfa** hasznosságot biztosít egy olyan állapotból indulva, ami a keresőfában az $n$ állapotból a gyökér felé vezetű úton van.

- **Béta**: **MIN-nek** már felfedeztünk egy olyan stratégiát, amely **béta** hasznosságot biztosít egy olyan állapotból indulva, ami a keresőfában az n állapotból a gyökér felé vezetű úton van.

Számítás a `maxÉrték(kezdőállapot, -végtelen, végtelen)` hívással indul.

```
maxErtek(n, alfa, beta) {
    if végállapot(n) return hasznosság(n)
    max = -végtelen
    for a in n szomszédai {
        max = max(max, minÉrték(a, alfa, beta)) // Itt a MIN játékos lép!
        if max >= beta return max // Vágás!
        alfa = max(max, alfa)
    }
    return max
}
```

```
mixErtek(n, alfa, beta) {
    if végállapot(n) return hasznosság(n)
    min = végtelen
    for a in n szomszédai {
        min = min(min, maxÉrték(a, alfa, beta)) // Itt a MIN játékos lép!
        if alfa >= min return min // Vágás!
        beta = min(min, beta)
    }
    return min
}
```

Ha mindig a legjobb lépést vesszük, akkor $O(b^{m / 2})$, amúgy $O(b^m)$.

> Gyakorlatban használhatunk rendezési heurisztikákat, amik sokszor közel kerülnek az optimális esethez. 

#### Korlátozás kielégítési feladat

**Lehetséges állapotok halmaza**: $\mathcal{D} = \mathcal{D}_1 \times ... \times \mathcal{D}_n$, ahol $\mathcal{D}_i$ az $i$. változó lehetséges értékei, azaz a feladat állapotai az $n$ db változó lehetséges értékkombinációi.

**Célállapotok**: A megengedett állapotok, amelyek definíciója a következő: Adottak $C_1, ..., C_m$ korlátozások, $C_i \subseteq \mathcal{D}$. A megengedett vagy konzisztens állapotok halmaza a $C_1 \cap ... \cap C_m$. (Ezek minden korlátozást kielégítenek)

> Gyakran egy $C_i$ korlátozás egy változóra vagy változópárra fejez ki megszorítást

**Kényszergráf**: A feladatban szereplő változók és a korlátozások által definiált gráf. Ugye ez változó párokra értendő, de ha esetleg több változót érintenek a korlátozások, az is felírható olyan korlátokkal, amik kettőt érintenek.

##### Inkrementális kereső algoritmusok

A probléma éllapottárbeli keresésként értelmezve:

- Minden változóhoz felveszünk egy új "ismeretlen" értéket. Jelölje ezt "?". a kezdeti állapot: $(?, ..., ?)$.

- Az állapotátmenet függvény rendeljen hozzá minden állapothoz olyan állapotokat, amelyekben egyel kevesebb ? van, és amelyek megengedettek.

- A költség minden állapotátmenetre legyen konstans.

> Mélységi keresés jó választás lehet, mert a keresőfa mélysége kicsi.

Informált kereséssel: próbáljunk nehezen kielégíthatő változókat kifejteni előbb:

- Amelyikhez a legkevesebb megengedett lépés maradt

- Amelyre a legtöbb korlátozás vonatkozik

A választott változó megengedett lépéseiből kezdjük azzal, amelyik a legkevésbé korlátozza a következő lehetséges lépések számát.

##### Optimalizáló algoritmusok, lokális keresők

Egy másik lehetséges megközelítés **optimalizálási problémát definiálni**:

- A **célfüggvényt** definiáljuk pl. úgy, hogy legyen a megsértett korlátozások száma. Ha eleve tartozott célfüggvény a feladathoz, össze kell kombonálni vele.

- Az **operátorokat** definiálhatjuk sokféleképpen, pl. valamely változó értékének megváltoztatásaként.

### 2. Teljes együttes eloszlás tömör reprezentációja, Bayes hálók. Gépi tanulás: felügyelt tanulás problémája, döntési fák, naiv Bayes módszer, modellillesztés, mesterséges neuronhálók, k-legközelebbi szomszéd módszere.

#### * Alapfogalmak

##### Véletlen változók

Van **neve**, és **lehetséges értékei**, azaz **domainje**.

**Elemi kijelentés**: $A$ értékének egy korlátozását fejezik ki (pl. $A = d$, ahol $d \in D_A$)

> Itt $A$ egy véletlen változó, $D_A$ domainnel.

**Véletlen változók típusai**:

- **Logikai**: A domain ekkor $\{ ~ igaz, hamis ~ \}$.
  
  - Pl. "Fogfájás=igaz", vagy csak simán "fogfájás" (és negáltja $\neg$fogfájás) egy elemi kijelentés.

- **Diszkrét**: Megszámlálható domain, pl. idő, ahol a domain $\{ ~ nap, esö, felhö, hó ~ \}$.
  
  - Pl. "Idő=nap", vagy csak simán "nap".

- **Folytonos**: Pl.: $X$ véletlen változó, $D \subseteq \mathbb{R}$
  
  - Pl. $X \le 3.2$ Egy elemi kijelentés

**Komplex kijelentések**: Elemi kijelentésekből képezzük a szokásos logikai operátorokkal.

**Elemi esemény**: Minden véletlen változóhoz értéket rendel: Ha $A_1, ..., A_n$ véletlen változókat definiálunk a $D_1, ..., D_n$ domainekkel, akkor az elemi események halmaza a $D_1 \times ... \times D_n$ halmaz.

**Valószínűség**: Egy függvény, amely egy kijelentéshez egy valós számot rendel.

> Véletlen változók: nagy betűk
> Kijelentések, és a változók értékei: kis betűk

$P(a)$ az $a$ kijelentés valószínűsége.

$P(A)$: $A$ tetszőleges értékére érvényes az adott állítás / képlet.

A $P$ függvény a **valószínűségi eloszlás**, amely minden lehetséges kijelentéshez valószínűséget rendel.

$P(A, B) = P(A \land B)$

###### Feltételes valószínűség

$P(a | b) = P(a \land b) / P(b)$ (feltéve, hogy $P(b) > 0$)

> **Jelentése**: *Az $a$ kijelentés **feltételes valószívűsége**, feltéve, hogy az összes tudásunk $b$ ($b$ is egy kijelentés)*

**Szorzatszabály**: $P(a \land b) = P(a | b)P(b) = P(b | a)P(a)$

##### Teljes együttes eloszlás

Az **összes elemi esemény valószínűségét** megadja.

Ebből kiszámolható **bármely kijelentés valószínűsége**.

Továbbiakhoz feltesszük, hogy az **összes változó diszkrét**.

###### Példa

Legyenek a véletlen változók `Luk`, `Fogfájás`, `Beakad`, mind logikai típusú. Ekkor a teljes együttes eloszlást egy táblázat tartalmazza:

| `Luk` | `Fogfájás` | `Beakad` | $P()$ |
|:-----:|:----------:|:--------:|:-----:|
| nem   | nem        | nem      | 0.576 |
| nem   | nem        | igen     | 0.144 |
| nem   | igen       | nem      | 0.064 |
| nem   | igen       | igen     | 0.016 |
| igen  | nem        | nem      | 0.008 |
| igen  | nem        | igen     | 0.072 |
| igen  | igen       | nem      | 0.012 |
| igen  | igen       | igen     | 0.108 |

#### * Függetlenség

Az $a$ és $b$ kijelentések függetlenek akkor, és csak akkor, ha $P(a \land b) = P(a) P(b)$.

Az $A$ és $B$ véletlen változók függetlenek akkor, és csak akkor, ha $P(A, B) = P(A)P(B)$, vagy ekvivalensen $P(A|B) = P(A)$, illetve $P(B|A) = P(B)$

Azaz két változó független, ha az egyik sem tartalmaz információt a másikról.

#### * Feltételes függetlenség

Az $a$ és $b$ **kijelentések** feltételesen függetlenek $c$ feltételével akkor, és csak akkor, ha $P(a \land b | c) = P(a | b)P(b|c)$. Ekkor $a$ és $b$ nem feltétlenül független abszolút értelemben.

Tipikus eset, ha $a$ és $b$ közös **oka** $c$.

$A$ és $B$ **véletlen változók** feltételesen függetlenek $C$ feltevésével akkor, és csak akkor, ha $P(A, B | C) = P(A | C) P(B|C)$, vagy ekvivalensen $P(A | B, C) = P(A | C)$, illetve $P(B | A, C) = P(B|C)$.

Egy lehetséges elérhető tömörítés:

$P(A, B, C) = P(A, B |C)P(C) = P(A|C)P(B|C)P(C)$

> Első egyenlőség: **Szorzatszabály**
> 
> Második egyenlőség: Feltételes függetlenség **feltevése**

> $P(A|C), P(B|C), P(C)$ táblázatok méreteinek összege sokkal kisebb lehet, mint az eredeti $P(A, B, C)$

Ha $A$ feltevése mellett $B_1, ..., B_n$ kölcsönösen függetlenek, azaz

$$
P(B_1, ..., B_n | A) = \prod_{i=1}^n P(B_i | A)
$$

Ez a naiv Bayes modell alakja. Itt $O(n)$ tömörítés érhető el, hiszen

$$
P(B_1, ..., B_n | A) = P(A) \prod_{i=1}^n P(B_i | A)
$$

#### Teljes együttes eloszlás tömör reprezentációja

> Feltételes függetlenséggel tudjuk tömöríteni a teljes együttes eloszlás reprezentációját

##### Láncszabály

Legyen $X_1, ..., X_n$ a féletlen változók egy tetszőleges felsorolása, ekkor a láncszabály:

$$
P(X_1, ..., X_n) = P(X_1 | X_2, ..., X_n) P(X_2, ..., X_n) = \\
P(X_1 | X_2, ..., X_n) P(X_2 | X_3, ..., X_n) P(X_3 | X_4, ..., X_n) ... P(X_n) = \\
\prod_{i = 1}^n P(X_i | X_{i + )}, ..., X_n)
$$

Minden $P(X_i | X_{i + }, ..., X_n)$ tényezőre az $\{ ~ X_{i + 1}, ..., X_n ~ \}$ változókból vegyünk egy $Szülök(X_i)$ részhalmazt, melyre igaz, hogy $P(X_i | X_{i + 1}, ...X_n) = P(X_i | Szülök(X_i))$, és a $Szülök(X_i)$ halmaz minimális, azaz belőle több elem nem hagyható el, különben a fenti tulajdonság sérül.

Ez a tömörítési lépés, és annál jobb, minél kisebb a $Szülök(X_i)$ halmaz.

Ekkor persze:

$$
P(X_1, ..., X_n) = \prod_{i = 1}^n P(X_i | Szülök(X_i))
$$

Ez a teljes együttes eloszlás tömörített reprezentációja.

#### Bayes-hálók

**Teljes együttes eloszlás tömörítése** alapján egy **gráfot definiál**, ami egy tömör, és intuitív reprezentációt tesz lehetővé.

A teljes együttes eloszlás tömörítésekor bevezetett $Szülök(X_i)$ jelölés már a gráf struktúrára utal, amelyben a csúcsok az $X_i$ véletlen változók, és az $(Y, X_i)$ irányított él akkor és csak akkor van behúzva, ha $Y \in Szülök(X_i)$. A gráfban minden $X_i$ változóhoz tartozik egy $P(X_i | Szülök(X_i))$ eloszlás.

Ez egy irányított, körmentes gráfot alkot.

##### Példa

![ ](../img/bayes_halo_pelda.png)

Egy konkrét lehetséges világ valószínűsége pl.:

$$
P(B \land \neg E \land A \land J \land \neg M) = \\
= P(B)P(\neg E)P(A | B, \neg E)P(J|A)P(\neg M | A) = \\
= 0.001 * (1 - 0.002) * 0.94 * 0.9 * (1 - 0.7)
$$

Ha egy Bayes-hálóban $X$-ből $Y$ csúcsba vezet él, akkor $Y$ és $X$ nem független.

DE nem igaz, hogy ha $X$ és $Y$ nem független, akkor van köztük él.

Egy eloszláshoz **sok különböző Bayes háló** adható.

##### Bayes-háló konstruálása

**Gyakorlatban** sokszor egy szakértő definiálja a változókat, és a hatásokat a változók között, és ennek a tudásnak a segítségével kitöltjük a változóhoz tartozó feltételes eloszlásokat. Ekkor adott az intuitív reprezentáció, ami definiál egy teljes együttes eloszlást, és ezt felhasználjuk valószínűségi következtetésekre.

**Elméleti** szempontból bármely adott együttes elosztásra konstruálható Bayes háló a láncszabállyal.

FONTOS! A láncszabály alkalmazásakor használt, rögzített változósorrendtől függ a Bayes háló.

##### Függetlenség, és Bayes hálók

Függetlenséggel kapcsolatos információk kiolvasása a hálóból.

Ha $Y$ nem leszármazottja $X$-nek, akkor: $P(X | Szülök(X), Y) = P(X | Szülök(X))$

Bármely $Y$ váltzóra igaz: $P(X | \text{Markov-takaró}(X), Y) = P(X | \text{Markov-takaró}(X))$

> **Markov-takaró(X)**: Az a halmaz, amely $X$ szülőinek, $X$ gyerekeinek, és $X$ gyerekei szülőinek az uniója.

#### Gépi tanulás

##### Felügyelt gépi tanulás

Egy $f: X \to Y$ függvényt keresünk, amely illeszkedik adott példákra.

A példák $(x_1, f(x_1)), ..., (x_n, f(x_n)) $ alakban adottak. $x_i \in X$

Pl.: $X$ az emailek halmaza, $Y = \{ ~ spam, \neg spam ~ \}$

Példák kézzel osztályozott emailek.

Egy $h : X \to Y$-t keresünk, ami $f$-et **közelíti**.

A $h$ függvény **konzisztens** az adatokkal, ha $h(x_i) = f(x_i)$ minden példára.

A $h$ függvényt mindig egy $H$ **hipotézistérben** keressük. Azaz a függvényt mindig egy adott alapkabn keressüg, pl. adott fokszámú polinom.

A tanulás **realizálható**, ha létezik $h \in H$, amelyre $H$ konzisztens.

Gyakorlatban elég, ha $h$ "közel" van a példákhoz, nem kell pontosan illeszkednie. Ez azért van, mert sokszor a tanuló példák zajt tartalmaznak, és káros ha ezeket megtanuljuk. (**túltanulás**)

**Indukció problémája**: $f$ jó közelítése olyan, amely a példákon kívül is jól közelíti $f$-et, azaz jól **általánosít**.

Jó tanulás alapja:

- $H$ hipotézistér gondos megválasztása
  
  - Tartalmazza $f$-et
  
  - Éppen annyira általános, amennyire kell (Occam borotvájának elve)

- Tanuló algoritmus megválasztása
  
  - $H$-ból kiválasztja $h$-t
  
  - Törekedhet tömören leírható $h$-t választani egy nagyon általános $H$-ból is.

- Számítási szempontból egyszerű reprezentáció, és hipozézistér
  
  - Hatékonyság miatt
  
  - Túl egyszerű reprezentáció sokszor komplex hipotézistereket eredményez

##### Reprezentáció

Az $X$ és $Y$ halmazok tetszőleges objektumokat írhatnak le, fontos ezek jó reprezentációja.

Pl.: Szövegek esetén szemantikus beágyazások.

$Y$ halmaz tartalmazhat diszkrét osztálycímkéket, vagy lehet folytonos halmaz is (regresszió).

##### Döntési fák

$x \in X$ diszkrét változók értékeinek vektora.

$f(x) \in Y$ egy diszkrét változó egy értéke. pl. $Y = \{ ~ igen, nem ~ \}$

Mivel $Y$ véges halmaz, osztályozási feladatról beszélünk, ahol $X$ elemeit kell osztályokba sorolni, és az osztályok $Y$ értékeinek felelnek meg.

![ ](../img/dontesi_fa.png)

Ez a döntési fa pl. azt határozza meg, hogy az adott jellemzők mellett ($X$) érdemes-e asztalra várni az étteremben ($Y$).

Ennek az előnye, hogy a döntések megmagyarázhatóak, emberikel értelmezhető a fenti ábra. Míg mesterséges neuron hálók esetében ez nem igaz.

###### Kifejezőerő

A kifejezőerő az **ítéletkalkulus**.

T.f.h. a címke logikai érték.

- **Ítéletek**: Változó értékadások.

- **Modell**: Egy $x \in X$ változóvektor egy modell, mert minden ítélet igazságértékét megadja.

- **Formula**: A döntési fából logikai formula gyártható, és fordítva,
  
  - Fából formula: Az "igen" címkékhez vezető utakban összeéseljük az éleket, majd összevagyoljuk az utakat.
  
  - Formulából fa: A formula igazságtábláját fel lehet írni fa alakban. Vegyük a változók egy $A_1, ..., A_n$ felsorolását, az $A_1$ a gyökérm $A_1$ értékei az élek, és az $i$. szinten a fában minden pontban $A_i$ van, amely pontokból az élek $A_i$ értékei. Az $A_n$ változóból kivezető élek már levelek lesznek, értékük az igazságtáblában található érték (a levéltől gyökérig vezető út meghatározza, az igazságtábla melyik sora kell).
  
  > Ez a faépítés nagy fákat eredményez, a gyakorlatban éltalában alkalmaznak tömörítési technikákat.

###### Döntési fa építése

Adottak ilyen felépítésű példák:

```
(
    (
        Vendégek=tele,
        Várakozás=10-30,
        Éhes=igen,
        VanMásHely=nem,
        Esik=igen,
        Foglalás=nincs,
        Péntek/Szombat=igen,
        VanBár=ige
    ),
    igaz
)
```

És ilyenekből minél több, legalább már száz.

Példákat bemagolni könnyő, pl. tekinthetjük a példákat az igazságtábla ismert sorainak, és az alapján építünk fát a korábbiak szerint. Ismeretlen sorokhoz véletlenszerű értéket írhatunk. Ez konzisztens az adatokkal.

De a magolás nem általánosít!

Ötlet: A gyökérbe tesszük azt a változót, ami a legtöbb információt hordozza, ezáltal a legjobban szeparálja a példákat.

Majd rekurzívan a még nem rögzített változók közül megint választunk.

Speciális esetek, amikor megállítják a rekurziót:

- Ha csak pozitív, vagy negatív példa van, akkor levélhez értünk, megcímkézzük.

- Ha üres halmazról van szó, akkor egy alapértelmezett értéket definiálunk, pl. a szülőben levő többségi döntést.

- Ha pozitív, és negatív példa is van, de nincs több változó: A többségi szavazattal címkézzük. (Ez akkor fordul elő, ha zajos az adat)

###### A legjobban szeparáló attribútum

Egy $p_1, ..., p_n$ valószínűségi eloszlás várható (átlagos) információtartalma, más néven **entrópiája**:

$$
H(p_1, ..., p_n) = - \sum_i p_i log(p_i)
$$

ahol $\sum_i p_i = 1$

Ennek minimuma $0$, ami a **maximális rendezettségi állapotot jelöli**. Amikor pontosan egy $i$-re $p_i = 1$, és $p_j = 0, i \ne j$.

A maximuma pedig $-log(1/n) = logn$, ez a maximális rendeze**tlenség** állapota.

Legyen egy példahalmazban $n^+$ pozitív, és $n^-$ negatív példa. Ekkor a példahalmaz entrópiája

$$
H \left( \frac{n^+}{n^+ + n^-} , \frac{n^-}{n^+ + n^-} \right) = \\
- \frac{n^+}{n^+ + n^-} log \frac{n^+}{n^+ + n^-} - \frac{n^-}{n^+ + n^-} log \frac{n^-}{n^+ + n^-}
$$

Információnyereség egy $A$ változóra nézve:

$$
H \left( \frac{n^+}{n^+ + n^-}, \frac{n^-}{n^+ + n^-} \right) - \sum_i \frac{n_i^+ + n_i^-}{n^+ + n^-} H \left( \frac{n_i^+}{n_i^+ + n_i^-}, \frac{n_i^-}{n_i^+ + n_i^-} \right)
$$

> Példahalmaz entrópiájának, és a az $A$ változó lehetséges értékei szerinti felosztás után keletkező részhalmazok átlagos entrópiájának a különbsége.

> $n_i^+$ és $n_i^-$ az $A$ változó $i$. lehetséges értékét tartalmazópozitív illetve negatív példák száma.

Ez alapján választható egy maximális nyereségű változó.

###### Zajszűrés az attribútumválasztásban

**Problémák**:

- **Magolás**

- **Túlillesztés**: Túl pontosan illesztjük az adatokra a modellt. Akkor, ha túl általános a modellünk, pl. egy lineáris közelítés helyett magas fokszámú polinom.

**Zajszűrés**: Megnézzük, hogy az **információnyereség statisztikailag szignifikáns-e**.

Pl.: $\chi ^2$ (**khí-négyzet**) próbával a $\chi^2$ **metszés** algoritmusával.

##### naiv Bayes módszer

###### Bayes szabály

$a$ és $b$ kijelentésekre:

$$
P(a|b) = \frac{P(b|a)P(a)}{P(b)}
$$

> Ebből következik: $P(a \land b) = P(a | b) P(b) = P(b|a)P(a)$

Általában is $A$ és $B$ változókra vagy változóhalmazokra:

$$
P(A|B) = \frac{P(B|A)P(A)}{P(B)}
$$

###### Naiv Bayes algoritmus

Statisztikai következtetű módszer.

Adatbázis-beli példák alapján példákat osztályoz

Legyen $A$ célváltozó, és $B_1, ..., B_n$ a nyelvünk szavai.

Pl. $A$ lehet igaz, ha az adott email spam, hamis, ha nem spam.

$B_i$ pedig logikai változó, az $i$. szó előfordulását jelzi. Igaz, ha az emailben szerepel az adott szó.

A feladat egy adott $b_1, ..., b_n$ email esetében meghatározni, hogy $A$ mely értékére lesz $P(A | b_1, ..., b_n)$ feltételes valószínűség maximális.

Ehhez a következő átalakításokat, illetve függetlenségi feltevéseket tesszük:

$$
P(A|b_1, ..., b_n) = \alpha P(A) P(b_1, ..., b_n |A) \approx \alpha P(A) \prod_{i=1}^n P(b_i|A)
$$

Első egyenlőség: a Bayes tétel alkalmazása. $\alpha = 1 / P(n_1, ..., b_n)$. 

Második közelítő egyenlőség: naiv Bayes feltevés. A pontatlanságért cserébe (ezért csak közelítő egyenlőség) $P(A)$ és $P(b_i |A)$ könnyen közelíthető az adatbázisban található példák segítségével.

Így gyakorlatban kiszámolható $A$ minden lehetséges értékére, nagysági sorrend meghatározható. A legvalószínűbb értéket választjuk.

##### Modellillesztés

Adottak a $\{ ~ (x_1, y_1), ..., (x_n, y_n) ~ \} \subseteq X \times Y$ példák.

Egy $h^*: X \to Y$ függvényt keresünk, amely a példákra jól illeszkedik, és jól általánosít.

Optimalizációs megközelítés: Definiáljuk az $l : X \times Y \times H \to \mathbb{R}$ veszteségfüggvényt, amely egy $(x, y) \in X \times Y$ példára megadja, hogy az adott $h \in H$ hipotézis "bennyi bajt okoz" az adott példán.

> Példa veszteségfüggvényre: Nényzetes hiba: $l(x, y, g) = (h(x)-y)^2$

Rögzített hibafüggvény esetén az optimalizálási feladat a következő:

$$
h^* = \arg \min_{h \in H} \sum_{i = 1}^n l(x_i, y_i, h)
$$

###### Lineáris regresszió

Három fő komponens:

- $H = \{ ~ h_{a,b}(x) = ax + b : a, b \in \mathbb{R} ~ \}$, azaz lineáris, eltolást ($b$) is tartalmazó függvények halmaza.

- $l(x, y, h_{a, b}) = (h_{a, b}(x) - y )^2 = (ax+b-y)^2$, azaz a négyzetes hiba.

- Az optimalizáló algoritmus legyen a **gradiens módszer**.

![ ](../img/linearis_regresszio.png)

###### Gradiens módszerek

Tegyük fel, hogy az $f: \mathbb{R} \to \mathbb{R}$ differenciálható.

Az $f'(x)$ derivált:

- $0$, ha $x$ lokális szélsőérték

- pozitív, ha $f$ növekszik $x$-nél

- negatív, ha $f$ csökken $x$-nél

A gradiens módszer alapja, hogy valameny tetszőleges $x_0$-ból kiindulunk, majd kiszámoljuk az

$$
x_{t+1} = x_t - \gamma_t f'(x_t)
$$

képlettel az $x_t$ sorozat elemeit, amelyre azt szeretnénk, hogy közelítse $f$ egy lokális minimumát.

Megfelelő $\gamma_t$ választása esetén ez garantált, azonban a pontos $\gamma_t$ nem mindig ismert.

> A gyakorlatban sokszor $\gamma_t = \gamma$ konstans értéket használjuk, ami elég kicsi ahhoz, hogy a rendszer konvergálni tudjon, vagy idővel csökkentjük $\gamma_t$-t

> $\gamma_t$-t a gépi tanulásban **learning rate**-nek nevezzük.

Ha $f: \mathbb{R}^d \to \mathbb{R}$ egy $d$ dimenziód differenciálható függvény, a fenti módszer változtatása nélkül alkalmazható, hiszen a $\nabla f(x) \in \mathbb{R}^d$ gradiens vektor a legnagyobb növekedés irányába mutat, így

$$
x_{t + 1} = x_t - \gamma_t \nabla f(x_t)
$$

hasonlóan viselkedik.

#### Mesterséges neuronhálók

##### Különálló neuron

![  ](../img/neuron.png)

Az $x_j$ a $j$. bemeneti érték, a $w_i$ a $j$. bemenet súlya.

A $w_0$ az eltolássúly (bias weight), $x_0$ fix bemenet mindig -1.

A neuron először a bemenetekből, és súlyokból kiszámolja a következő összeget:

$$
\sum_{j = 0}^d x_jw_j
$$

Majd az összeg végeredményén alkalmazza az **aktivációs függvényt**.

##### Aktivációs függvény

![ ](../img/aktivacios_fuggveny.png)

Eredeti célja: Ha "jó" input jön, akkor adjon 1-hez közeli értéket, ha "rossz" input jön, akkor 0-hoz közelit.

Manapság már nem követelmény, hogy $[0, 1]$-ből adjon értéket.

De fontos, hogy nemlineáris, ugyanis akkor magukkal a súlyokkal is kifejezhető lenne.

Pár példa:

- **Küszöbfüggvény**
  
  - $g(x) = 0$ ha $x < 0$
  
  - $g(x) = 1$ ha $x > 0$
  
  - Ezzel az aktivációs függvénnyel a neuron a klasszikus "**perceptron**"

- **Szigmoid függvény**
  
  - $g(x) = \frac{1}{1 + e^{-x}}$

- **Rectifier aktiváció**
  
  - $g(x) = max(0, x)$
  
  - Ezt használó neuront **ReLU**-nak hívjuk

##### Neuron kimenete

A neuron a teret két részre osztja egy hipersíkkal.

- $w \cdot x > 0$ esetén elfogadja az inputot

- különben nem

> $w \cdot x$ a $w$ és $x$ vektorok belső szorzata, ugyan az  mint a fentebb leírt szummma, ami az aktivációs függvény inputja. 

Emiatt csak lineárisan szeparálható függvények reprezentálhatóak hiba nélkül.

Példa logikai műveletek lineáris szeparálására:

![ ](../img/linearisan_szeparalhatosag.png)

> Látszik, hogy a XOR nem lineárisan szeparálható, mert nem lehet olyan egyenest behúzni ami szeparálja az igaz, és hamis értékeket.

##### Többrétegű hálók

Neuronokból épített hálózat.

![ ](../img/neuron_halo_pelda.png)

$x_1$ és $x_2$ a bemenet.

Itt most nincsenek eltolássúlyok, de amúgy kellenének.

Réteg csoportok:

- **Bemeneti réteg**: Szögletes csúcsok alkotják, ez maga a bemenetek halmaza

- **Kimeneti réteg**: 5-ös számú neuron alkotjha most egyedül, de lehetne több is, pl. 1-1 minden lehetséges osztálycímkének

- **Rejtett rétegek**: Minden másik köztes réteg

> Egy egy előrecsatolt hálózat (a kapcsolatok az input irányától az output irányába mutatnak), de lehet olyat is építeni, amiben van kör, ezek a rekurrens hálózatok.

##### Többrétegű hálók algoritmusa

Optimalizáció alapú megközelítést alkalmazunk, ennek komponensei lehetnek pl.:

- $H = \{ ~ h_w : w \in \mathbb{R}^m ~ \}$
  
  - Ahol $h_w : \mathbb{R}^d \to [0, 1]$ egy rögzített struktúrájú, $w$ súlyokkal rendelkező neuronháló

- $l(x, y, h_w) = - \log P(y | x, h_w)$
  
  - Ez a $h_w$ hipotézis **negatív log likelihood**ja

- Optimalizáló algoritmus legyen gradiens módszer

Visszaterjesztés (**backpropagation**): Valójában a gradiens kiszámolására szolgál. A kimenetenjelentkező veszteség visszaterjesztődik a rejtett neuronokra, ez alapján a súlyok állítása.

Több osztály esetén több kimeneti neuron, veszteségfüggvény: **kereszt entrópia**

> De ennek van bináris változata is (2 osztály)

##### Modern neuronháló-architektúrák

###### Teljesen összefüggő réteg

$d$ dimenziós input $k$ dimenziós inputra leképezése:

![ ](../img/teljesen_osszefuggo_reteg.png)

Összes input össze van kötve az összes kimenettel, összesen $d \cdot k$ kapcsolat, mind külön súllyal.

Tehár összesen eltolási súlyokkal együtt $d \cdot k + k$ súly van.

###### Konvolúciós réteg

Ha az inputban fontos a szomszédsági / sorrendiségi reláció.

Például képek, hangok esetén.

Egy 1D struktúrájú inputtal (A.K.A egy vektorral) működő konvolúciós réteg:

![ ](../img/konvolucios_reteg.png)

- Réteg azonos neuronokból áll, a súlyaik megegyeznek

- Minden neuron csak egy rögzített összefüggő sávot lát az inputból

Az ábrán látható réteg például leírható 3db súllyal. Ami a teljesen összefüggő réteghet képest nagyon kevés.

3 szépességű szűrővel végigpásztázzuk az inputot. 

**Paraméterek**: lépésköz (**stride**), iletve a szűrőméret ($F$)

Ezek a paraméterek meghatározzák az output dimenzióját, ami $\lceil (d - F + 1) / S \rceil$. Ha $F > 1$, akkor ez mindig kevesebb, mint az input dimenzió. 

> Ha nem akarjuk, hogy csökkenjen az input, lehet **zero padding**-et használni

Példa 2D-s inputtal, zero padding-el:

![ ](../img/2d_konvolucios_reteg.png)

Neuronok is 2D elrendezésben.

Ez a réteg 9 súllyal leírható ($3 \times 3$-as szűrő)

3D input, a 3. dimenzió, a mélység lehet pl. színes képek esetén 3, az RGB színeknek:

![ ](../img/3d_konvolucios_reteg.png)

###### Max pooling réteg

Input méretének csökkentésére szolgál.

Például 2D-ben egy $2 \times 2$-es max szűrő 2-es lépésközzel:

![ ](../img/max_pooling.png)

#### k-legközelebbi szomszéd módszere

Példányalapú tanuló algoritmus.

Adottak $(x_1, y_1), ..., (x_n, y_n)$ példák.

Adott $x$-re az $y$-r az $x$-hez közeli példák alapján határozzuk meg.

1. Keressük meg $x$ $k$db legközelebbi szomszédját ($k$ pl. 5 és 10 között, lehetőleg páratlan, hogy ne legyen holtverseny)

2. A $h(x)$ értéke ezen szomszédok $y$-jainak átlaga (esetleg távolsággal súlyozva) ha $y$ folytonos, ha diszkrét akkor pedig pl. többségi szavazat.

**Sűrűség közelítése**: Ha $x_1, ..., x_n$ példák adottak ($y$ nélkül), akkor a $P(X)$ sűrűség közelítésére is jó: adott $x$-re nézzük meg, hogy a $k$ legközelebbi szomszéd mekkora területen oszlik el. $P(x)$ ekkor fordítottan arányos a területtel.

Távolság függvény: $D(x_1, x_2)$.

- Diszkrét esetben, pl. Hamming-távolság: a különböző jellemzők száma
  
  > Hamming(001, 011) = 1

- Folytonos esetben pl. euklideszi távolság, manhattan távolság, stb.
  
  - Folytonos jellemzőket normalizálni kell, mert egyes jellemző értékek más skálán mozoghatnak (pl. hőmérséklet, magasság).
  
  - Standardizálás: Jellemzőkből kivonjuk az átlagot, és elosztjuk a szórással.

Az algoritmus hibái:

- Érzékeny a távolságfüggvény definíciójára

- Sok példa esetén költséges a $k$ legközelebbi szomszédot megtalálni

- Sok jellemző esetén (sok dimenziós térben) a távolságfüggvény nagyon nem intuitív
