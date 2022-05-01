## Algoritmusok és Adatszerkezetek I

### 1. Részproblémára bontható algoritmusok (mohó, oszd-meg-és-uralkodj, dinamikus programozás), rendező algoritmusok, gráfalgoritmusok (szélességi- és mélységi keresés, minimális feszítőfák, legrövidebb utak)

#### Mohó algoritmusok

A feladatot pontosan egy részfeladatra bontják, és azt tovább rekurzívan oldják meg. Mindig a legjobbnak tűnő megoldás irányába haladunk tovább.

**Nem minden problémára adható mohó megoldás!**

De ha létezik, akkor nagyon hatékony!

**Mohó választás**: Az adott problémát egyetlen részproblémára bontja. Ennek optimális megoldásából következik az eredeti feladat optimális megoldása is.

##### Mohó algoritmus tervezése

1. Fogalmazzuk meg a **mohó választást**.

2. Bizonyítsuk be, hogy az eredeti problémának mindig van olyan **optimális megoldása**, amely **tartalmazza a mohó választást**. Tehát hogy a mohó választás **biztonságos**.

3. Bizonyítsuk be, hogy a mohó választással olyan részprobléma keletkezik, amelynek egy **optimális megoldásához hozzávéve a mohó választást**, az eredeti probléma egy optimális megoldását kapjuk.

##### Példa: _Töredékes hátizsák feladat_

**Bemenet**: A hátizsák <img src="https://render.githubusercontent.com/render/math?math=S" /> kapacitása, <img src="https://render.githubusercontent.com/render/math?math=n" /> tárgy, <img src="https://render.githubusercontent.com/render/math?math=S_i" /> tárgy súlyok, <img src="https://render.githubusercontent.com/render/math?math=E_i" /> tárgy értékek

**Kimenet**: Mi a legnagyobb érték, ami <img src="https://render.githubusercontent.com/render/math?math=S" /> kapacitásba belefér?

Minden tárgyból 1db van, de az darabolható.

**Algoritmus**:

- Számoljuk ki minden tárgyra az <img src="https://render.githubusercontent.com/render/math?math=%5Cfrac%7BE_i%7D%7BS_i%7D" /> arányt

- Tegyünk bele a legnagyobb <img src="https://render.githubusercontent.com/render/math?math=%5Cfrac%7BE_i%7D%7BS_i%7D" />-vel rendelkező, még rendelkezésre álló tárgyból annyit a zsákba, amennyi belefér

<img title="" src="../img/toredekes_hatizsak.png" alt=" " data-align="center" width="395">

Futás a fenti példán:

- Kiszámoljuk az <img src="https://render.githubusercontent.com/render/math?math=%5Cfrac%7BE_i%7D%7BS_i%7D" /> értékeket
  
  1. Tárgy: 6
  
  2. Tárgy: 5
  
  3. Tárgy: 4

- Végighaladunk a tárgyakon az <img src="https://render.githubusercontent.com/render/math?math=%5Cfrac%7BE_i%7D%7BS_i%7D" /> arányok szerint
  
  - Az első tárgy teljes egészében belefér, azt beválasztjuk.
  
  - A 2. tárgy is teljes egészében belefér, azt is beválasztjuk.
  
  - A 3. tárgy már nem fér be, beválasztunk annyit, amennyi kitölti a szabad helyet. Jelen esetben a tárgy <img src="https://render.githubusercontent.com/render/math?math=%5Cfrac%7B2%7D%7B3%7D" />-át.

> A probléma nem-törtedékes verziójára ez a mohó algoritmus nem mindig talál optimális megoldást.

> 

#### Oszd-meg-és-uralkodj algoritmusok

A feladatot több **részfeladatra** bontjuk, ezek hasonlóak az eredeti feladathoz, de méretük kisebb, tehát ugyan azt a feladatot akarjuk egy kisebb bemenetre megoldani.

**Rekurzív módon** megoldjuk ezeket a részfeladatokat (azaz ezeket is kisebb részfeladatokra bontjuk egészen addig, amíg elemi feladatokig jutunk, amelyekre a megoldás triviális), majd **összevonjuk őket**, hogy az eredeti feladatra megoldást adjanak.

> A részfeladatok ne legyenek átfedőek. Bár az algoritmus ettől még működhet, de nem hatékony.

##### Lépések

1. **Felosztás**: Hogyan osztjuk fel a feladatot több kisebb részfeladatra.

2. **Uralkodás**: A feladatokat rekurzív módon megoldjuk. Ha a részfeladatok mérete elég kicsi, akkor közvetlenül meg tudjuk oldani a részfeladatot, ilyenkor nem osztjuk tovább rekurzívan.

3. **Összevonás**: A részfeladatok megoldásait összevonjuk az eredeti feladat megoldásává.

##### Példa: _Összefésülő rendezés_

1. **Felosztás**: Az <img src="https://render.githubusercontent.com/render/math?math=n" /> elemű rendezendő sorozatot felosztja két <img src="https://render.githubusercontent.com/render/math?math=%5Cfrac%7Bn%7D%7B2%7D" /> elemű részsorozatra.

2. **Uralkodás**: A két részsorozatra rekurzívan tovább hívjuk az összefésülő rendezés eljárást. Az elemi eset az egy elemű részsorozat, hiszen az már rendezett, ilyenkor csak visszatérünk vele.

3. **Összevonás**: Összefésüli a két rendezett részsorozatot, ezzel létrehozza az eredeti sorozat rendezett változatát.

```c
          [6, 5, 3, 1, 8, 7, 2, 4]
               /             \
        [6, 5, 3, 1]    [8, 7, 2, 4]
          /                      \
  [6, 5]    [3, 1]        [8, 7]    [2, 4]
  /  \       /   \        /   \      /   \
[6]  [5]    [3]  [1]    [8]  [7]    [2]  [4]

[6]  [5]    [3]  [1]    [8]  [7]    [2]  [4]
  \  /        \  /        \  /        \  /
 [5, 6]      [1, 3]      [7, 8]      [2, 4]
      \      /                \      /
    [1, 3, 5, 6]            [2, 4, 7, 8]
          \                       /
           [1, 2, 3, 4, 5, 6, 7, 8]
```

> Az összefésülés folyamata egyszerű, csak két mutatót vezetünk a két rendezett tömbön, lépkedünk, mindig a kisebbet fűzzük egy másik, kezdetben üres tömbhöz.

##### Példa: _Felező csúcskereső algoritmus_

Vizsgáljuk meg a középső elemet. Ha csúcs, térjünk vissza vele, ha nem csúcs, akkor az egyik szomszédja nagyobb, vizsgáljuk tovább a bemenet felét ezen szomszéd irányába. Azért megyünk ebbe az irányba, mert erre biztosan van csúcs. Ezt onnan tudjuk, hogy maga ez a nagyobbik szomszéd is egy potenciális csúcs. Ha mindkét szomszédja nagyobb, akkor mindegy melyik irányba haladunk tovább, egyszerűen azzal, amiről előbb megtudtuk, hogy nagyobb.

1. **Felosztás**: <img src="https://render.githubusercontent.com/render/math?math=n" /> elemű sorozatot felosztjuk két <img src="https://render.githubusercontent.com/render/math?math=%5Cfrac%7Bn%20-%201%7D%7B2%7D" /> elemű részsorozatra
2. **Uralkodás**: A megfelelő részsorozatban rekurzívan tovább keresünk csúcsot
3. **Összevonás**: Ha csúcsot találtunk, adjuk vissza

```c
// Kiindulási tömb:
[1, 3, 4, 3, 5, 1, 3]

// Középső elemet megkeressük, nem csúcs, így tovább haladunk:
[1, 3, 4, 3, 5, 1, 3]
          ^
// Középső elemet megkeressük, nem csúcs, így tovább haladunk:
[1, 3, 4][3, 5, 1, 3]
    ^
// A középső elem egy csúcs, visszaadjuk
[1, 3][4][3, 5, 1, 3]
       ^
```

Ez az algoritmus logaritmikus időigényű. Ezzel szemben az egyszerű megoldás amikor minden elemen végighaladva keresünk csúcsot, lineáris, azaz jelentősen rosszabb.

#### Dinamikus programozás

Olyan feladatok esetén alkalmazzuk, amikor a **részproblémák nem függetlenek**, azaz vannak közös részproblémák.

> **Optimalizálási feladatok** tipikusan ilyenek.

A megoldott **részproblémák eredményét memorizáljuk** (mondjuk egy táblázatban), így ha azok mégegyszer elő kerülnek, nem kell újra kiszámolni, csak elővenni memóriából az eredményt.

##### Iteratív megvalósítás

- Minden részmegoldást kiszámolunk.

- Alulról-felfelé építkező megközelítés, hiszen előbb a kisebb részproblémákat oldjuk meg, amiknek az eredményét felhasználjuk az egyre nagyobb részproblémák megoldásához.

##### Rekurzív megvalósítás

- Részmegoldásokat kulcs-érték formájában tároljuk.

- Felülről lefele építkező megközelítés.

- **Csak akkor használjuk, ha nem kell minden megoldást kiszámolni!**
  
  - Ha ki kell mindent számolni, érdemesebb az iteratív megköelítést választani a függvényhívások overhead-je miatt.

##### Példa: _Pénzváltás feladat_

Adott <img src="https://render.githubusercontent.com/render/math?math=P_i" /> érmékkel (mindből van végtelen sok) hogyan lehet a legkevesebb érmét felhasználva kifizetni <img src="https://render.githubusercontent.com/render/math?math=F" /> forint.

```c
// Input:
P1 = 1;
P2 = 5;
P3 = 6;
F  = 9;
```

###### Rekurzív megvalósítással a futás

```c
// Egy dimenziós tömbbel dolgozunk, egyes sorokban
// az egyes hívások állapota látszódik.
// Első sor a pénzérme indexét jelöli.

0  1  2  3  4  5  6  7  8  9
0  -  -  -  -  -  -  -  -  ? // penzvalt(9) = min( penzvalt(3), penzvalt(4), penzvalt(8) ) + 1
0  -  -  ?  -  -  -  -  -  ? // penzvalt(3) = min( penzvalt(2) ) + 1
0  -  ?  ?  -  -  -  -  -  ? // penzvalt(2) = min( penzvalt(1) ) + 1
0  ?  ?  ?  -  -  -  -  -  ? // penzvalt(1) = min( penzvalt(0) ) + 1
0  1  ?  ?  -  -  -  -  -  ? // penzvalt(0)-t ismertük már, kiindulástól kezdődően el volt mentve rá a triviális 0 megoldás, így penzvaltas(1) = 0 + 1
0  1  2  ?  -  -  -  -  -  ? // penzvalt(1) visszatér, kiadja penzvalt(2) eredményét
0  1  2  3  -  -  -  -  -  ? // penzvalt(2) visszatér, kiadja penzvalt(3) eredményét
0  1  2  3  -  -  -  -  -  ? // penzvalt(3) visszatér

// penzvalt(9) jelenleg itt tart: min( 3, penzvalt(4), penzvalt(8) ) + 1
0  1  2  3  4  -  -  -  -  ? // penzvalt(4) = min( penzvalt(3) ) + 1

// penzvalt(9) jelenleg itt tart: min( 3, 4, penzvalt(8) ) + 1
0  1  2  3  4  -  -  -  ?  ? // penzvalt(8) = min( penzvalt(2) = 2, penzvaltas(3) = 3, penzvaltas(7) ) + 1
0  1  2  3  4  -  -  ?  ?  ? // penzvalt(7) = min( penzvalt(1) = 1, penzvaltas(2) = 2, penzvaltas(6) ) + 1
0  1  2  3  4  -  ?  ?  ?  ? // penzvalt(6) -> mivel ilyen érménk van, így ezt nem kell kiszámolni, tujuk, hogy penzvalt(6) = 1
0  1  2  3  4  -  1  2  ?  ? // penzvalt(6) visszatér, kiadja penzvalt(7)-et
0  1  2  3  4  -  1  2  3  ? // penzvalt(7) visszatér, kiadja penzvalt(8)-at
0  1  2  3  4  -  1  2  3  4 // penzvalt(8) visszatér, kiadja penzvalt(9)-et
```

> Bár elmondható, hogy egy esetre, az 5-re nem kellett kiszámolnunk az értéket, de ez implementáció függő volt, ha `penzvalt(6)`-ot is ugyan úgy számoltuk volna, mint a többi értéket, akkor mindent kiszámoltunk volna, ás a rekurzív függvényhívűsok overhead-je miatt egyértelműen az iteratív megközelítés lenne a jobb.

###### Iteratív megvalósítással a futás

```c
// 0-tól F-ig (9-ig) építunk egy egy dimentziós tömböt
0  1  2  3  4  5  6  7  8  9

0  ?  ?  ?  ?  ?  ?  ?  ?  ?
0  1  ?  ?  ?  ?  ?  ?  ?  ? // penzvalt[1] = min( penzvalt[0] ) + 1
0  1  2  ?  ?  ?  ?  ?  ?  ? // penzvalt[2] = min( penzvalt[1] ) + 1
0  1  2  3  ?  ?  ?  ?  ?  ? // penzvalt[3] = min( penzvalt[2] ) + 1
0  1  2  3  4  ?  ?  ?  ?  ? // penzvalt[4] = min( penzvalt[3] ) + 1
0  1  2  3  4  1  ?  ?  ?  ? // penzvalt[5] = min( penzvalt[0], penzvalt[4] ) + 1
0  1  2  3  4  1  1  ?  ?  ? // penzvalt[6] = min( penzvalt[0], penzvalt[1], penzvalt[5] ) + 1
0  1  2  3  4  1  1  2  ?  ? // penzvalt[7] = min( penzvalt[1], penzvalt[2], penzvalt[6] ) + 1
0  1  2  3  4  1  1  2  3  ? // penzvalt[8] = min( penzvalt[2], penzvalt[3], penzvalt[7] ) + 1
0  1  2  3  4  1  1  2  3  4 // penzvalt[9] = min( penzvalt[3], penzvalt[4], penzvalt[8] ) + 1
```

#### Rendező algoritmusok

##### Rendezés

- **Input**: Egészek egy <img src="https://render.githubusercontent.com/render/math?math=n" /> hosszú tömbje (egy `<a1, a2, ..., an>` sorozat)

- **Output**: <img src="https://render.githubusercontent.com/render/math?math=n" /> hosszú, rendezett tömb (az input sorozat egy olyan `<a'1, a'2, ..., a'n>` permutációja, ahol `a'1 <= a'2 <= ... <= a'n`)

> Ez egy egyszerű eset, a gyakorlatban:
> 
> - Van valamilyen iterálható kollekciónk: `Iterálható<Objektum>`)
> 
> - Van egy függvényünk, ami megondja képt kollekció-elemről, hogy melyik a _nagyobb_: `(a: Objektum, b: Objektum) => -1 | 0 | 1`
> 
> Ezek együttesével már megfelelően absztrakt módon tudjuk használni az összehasonlító rendező algoritmusokat bármilyen esetben.

##### Beszúró rendezés

**Helyben rendező** módszer.

```ts
const beszuroRendezes = (A: number[]) => {
  for (let j = 1; j < A.length; j++) {
    const beillesztendo = A[j];
    let i = j - 1;
    for (; i >= 0 && A[i] > beillesztendo; i--) {
      A[i + 1] = A[i];
    }
    A[i + 1] = beillesztendo;
  }
  return A;
};
```

![  ](../img/beszuro_rendezes.png)

Végig haladunk a tömbön, és minden elemtől visszafelé elindulva megkeressük annak a helyét, és beszúrjuk oda. Amin áthaladtunk, az a részsorozat már rendezett lesz mindig.

| Futásidő | Tárigény ( össz ~ inputon kívül ) |
|:--------:|:---------------------------------:|
| <img src="https://render.githubusercontent.com/render/math?math=O(n%5E2)" /> | <img src="https://render.githubusercontent.com/render/math?math=O(n)" /> ~ <img src="https://render.githubusercontent.com/render/math?math=O(1)" />                   |

Legrosszabb eset: Teljesen fordítva rendezett tömb az input: `[5, 4, 3, 2, 1]`. Ekkor minden `beillesztendo` elemre vissza kell lépkedni a tömb elejéig.

##### Kupacrendezés

```ts
const kupacRendezes = (A: number[]) => {
    maximumKupacotEpit(A); // Helyben kupacosítja
    for (let i = A.length - 1, i >= 1; i--) {
        csere(A[1], A[i]);
        kupacMeret[A]--;
        maximumKupacol(A, 1);
    }

    return A;
}
```

Az input tömböt először **maximum-kupaccá** kell alakítani. Ekkor tudjuk, hogy a legnagyobb elem a gyökérben van, így ezt berakhatjuk az éppenvizsgált pozícióra (`csere(A[1], A[i])`). Ez után már csak csökkentenünk kell a kupac méterét, hiszen nem akarjuk mégegyszer a gyökérben az `A[i]`-t. Végezetül helyre kell állítanunk a kupac-tulajdonságot egy `maximumKupacol(A, 1)` hívással. (A 2. paraméter azt mondja meg, melyik csúcsbtól lefelé szeretnénk helyreállítani, jelen esetben az 1-es, hiszen pont azt a pozíciót rontottuk el, amikor cseréltünk. Tehát az egész kupacot helyreállítjuk.)

![  ](../img/kupac_rendezes.png)

| Futásidő      | Tárigény ( össz ~ inputon kívül ) |
|:-------------:|:---------------------------------:|
| <img src="https://render.githubusercontent.com/render/math?math=O(n*log(n))" /> | <img src="https://render.githubusercontent.com/render/math?math=O(n)" /> ~ <img src="https://render.githubusercontent.com/render/math?math=O(1)" />                   |

##### Gyorsrendezés

Összefésülő rendezéshez hasonlóan oszd-meg-és-uralkodj algoritmus

- **Felosztás**: Az `A[p..r]` tömböt, két (esetleg üres) `A[p..q-1]` és `A[q+1..r]` résztömbre osztjuk, hogy az `A[p..q-1]` minden eleme kisebb, vagy egyenlő `A[q]`-nál, és `A[q]` kisebb vagy egyelő `A[q+1..r]` minden eleménél. A `q` index kiszámítása része ennek a felosztó eljárásnak.

- **Uralkodás**: Az `A[p..q−1]` és `A[q+1..r]` résztömböket a gyorsrendezés rekurzív hívásával rendezzük.

- **Összevonás**: Mivel a két résztömböt helyben rendeztük, nincs szükség egyesítésre: az egész `A[p..r]` tömb rendezett.

```ts
const feloszt = (A: number[], p: number, r: number) => {
  const x = A[r];
  let i = p - 1;
  for (let j = p; j <= r - 1; j++) {
    if (A[j] <= x) {
      i++;
      [A[i], A[j]] = [A[j], A[i]];
    }
  }
  [A[r], A[i + 1]] = [A[i + 1], A[r]];
  return i + 1;
};
```

```ts
const _gyorsRendezes = (A: number[], p: number, r: number) => {
  if (p < r) {
    const q = feloszt(A, p, r);
    _gyorsRendezes(A, p, q - 1);
    _gyorsRendezes(A, q + 1, r);
  }
  return A;
};

const gyorsRendezes = (A: number[]) => _gyorsRendezes(A, 0, A.length - 1);
```

| Futásidő | Tárigény |
| -------- |:--------:|
| <img src="https://render.githubusercontent.com/render/math?math=O(n%5E2)" /> | <img src="https://render.githubusercontent.com/render/math?math=O(n)" />   |

> Fontos, hogy az eljárás teljesítménye függ attól, hogy a felosztások mennyire ideálisak. Valószívűségi alapon a vátható rekurziós mályság <img src="https://render.githubusercontent.com/render/math?math=O(logn)" />, ami mivel egy hívás futásideje <img src="https://render.githubusercontent.com/render/math?math=O(n)" />, így az átlagos futásidő <img src="https://render.githubusercontent.com/render/math?math=O(n%20*%20logn)" />. A gyakorlat azt mutatja, hogy ez az algoritmus jól teljesít.

> Lehet úgy implementálni, hogy <img src="https://render.githubusercontent.com/render/math?math=O(logn)" /> tárigénye legyen, ez egy helyben rendező, farok-rekurzív ejlárás.

##### Összehasonlító rendezések teljesítményének alsó korlátja

Minden összehasonlító rendező algoritmus legrosszabb esetben <img src="https://render.githubusercontent.com/render/math?math=%5COmega(n%20*%20logn)" /> összehasonlítást végez.

> Ez alapján pl. az összefésülő, vagy a kupac rendezés **aszimptotikusan optimális**.

> Eddigi algoritmusok mind összahasonlító rendezések voltak, a kövezkező már nem az.

Ezt döntési fával lehet bebizonyítani, aminek belső csúcsai meghatároznak két tömbelemet, amiket épp összehasonlítunk, a levelek pedig hogy az oda vezető összehasonlítások milyen sorrendhez vezettek. Nem konkrét inputra írható fel döntési fa, hanem az algoritmushoz. Így ennek a fának a legrosszabb esetben vett magassága lesz az algoritmus futásidejének felső korlátja.

##### Leszámoló rendezés

Feltételezzük, hogy az összes bemeneti elem <img src="https://render.githubusercontent.com/render/math?math=0" /> és <img src="https://render.githubusercontent.com/render/math?math=k" /> közé esik.

Minden lehetséges bemeneti elemhez megszámoljuk, hányszor fordul elő az inputban.

Majd ez alapján azt, hogy hány nála kisebb van.

Ez alapján már tudjuk, hogy az egyes elemeknek hova kell kerülni. Mert ha pl 5 elem van, ami kisebb, vagy egyenlő, mint 2, akkor tudjuk, hogy az 5. pozíción 2-es kell, hogy legyen.

```ts
const leszamoloRendezes = (A: number[], k: number) => {
  const C = [...new Array(k + 1)].map(() => 0);
  A.forEach((szam) => {
    C[szam]++;
  });
  // Itt a C-ben azon elemek száma van, aminek értéke i

  for (let i = 1; i < C.length; i++) {
    C[i] += C[i - 1];
  }
  // Itt C-ben i indexen azon elemek száma van, amik értéke kisebb, vagy egyenlő, mint i

  const B = [...new Array(A.length)]; // B egy A-val egyező hosszú tömb

  for (let i = A.length - 1; i >= 0; i--) {
    B[C[A[i]] - 1] = A[i];
    C[A[i]]--;
  }

  return B;
};
```

| Futásidő        | Tárigény     |
|:---------------:|:------------:|
| <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(k%20%2B%20n)" /> | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(2n)" /> |

> A gyakorlatban akkor használjuk, ha <img src="https://render.githubusercontent.com/render/math?math=k%20%3D%20O(n)" />, mert ekkor a futásidő <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(n)" />

#### Gráfalgoritmusok

Gráfok ábrázolása: **éllista** vagy **szomszédsági mátrix**

![ ](../img/graf_abrazolas.png)

##### Szélességi keresés

Gráf bejárására szolgál.

A bejárás során kijelöl egy "szélességi fát", ami egy kiindulási csúcsból indulva mindig az adott csúcsból elérhető csúcsokat reprezentálja.

Amilyen távol van a kiindulási csúcstól egy csúcs, az olyan mélységen helyezkedik el ebben a fában.

Irányított, irányítatlan gráfog esetén is alkalmazható.

A csúcsok távolsága alapján kalad a bejárás (a kijelölt kezdeti csúcstól), minden <img src="https://render.githubusercontent.com/render/math?math=k" /> távolságra levő csúcsot elérünk az előtt, hogy egy <img src="https://render.githubusercontent.com/render/math?math=k%20%2B%201" /> távolságra levőt elérnénk.

Az algoritmus színezi a csúcsokat, ezek a színek a következőket jelentik:

- **fehér**: Kiindulási szín, egy ilyen színű csúcsot még nem értünk el.

- **szürke**: Elért csúcs, de még van fehér szomszédja.

- **fekete**: Elért csúcs, és már minden szomszédja is elért (vagy szürke vagy fekete).

![ ](../img/szelessegi.png)

```js
// A G a gráf, s a kiindulási csúcs
szelessegiKereses(G, s) {
    for G grás minden nem s csúcsára {
        szín[csucs] = "fehér"
    }
    szín[s] = "szürke"
    d[s] = 0 // Távolság s-től
    szülő[s] = null
    Q = [] // Üres SOR
    sorba(Q, s)
    while Q nem üres {
        u = sorból(Q)
        for u minden v szomszédjára {
            if (szín[v] === "fehér") {
                szín[v] = "szürke"
                d[v] = d[u] + 1
                szülő[v] = u
                sorba(Q, v) // Tovább feldolgozzuk majd neki a szomszédjait
            }
        }
        szín[u] = "fekete" // Itt már végigmentünk minden szomszédján
    }
}
```

###### Futásidő

- Minden csúcsot egyszer érintünk csak, ez <img src="https://render.githubusercontent.com/render/math?math=V" /> db csúcs.

- Sorba, és sorból <img src="https://render.githubusercontent.com/render/math?math=O(1)" />, így a sorműveletek összesen <img src="https://render.githubusercontent.com/render/math?math=O(V)." />

- Szomszédsági listákat legfeljebb egyszer vizsgáljuk meg, ezek össz hossza <img src="https://render.githubusercontent.com/render/math?math=%5Ctheta(E)" />, így összesen <img src="https://render.githubusercontent.com/render/math?math=O(E)" /> időt fordítunk a szomszédsági listák vizsgálására.

- Az algoritmus elején a kezdeti értékadások ideje <img src="https://render.githubusercontent.com/render/math?math=O(V)" />.

- Összesített futásidő: <img src="https://render.githubusercontent.com/render/math?math=O(E%20%2B%20V)" />

##### Mélységi keresés

Addig megy a kivezető élek mentén, ameddig tud, majd visszafele indulva minden érintett csúcs kivezető élein addig megy mélyre, amíg lehet.

Ugyan azokat a színekez használja a csúcsok színezésére, mint a szélességi keresés.

Minden csúcshoz feljegyzi, hogy mikor (hány lépés után) érte el, és hagyta el azt.

```js
melysegiKereses(G) {
    for G minden u csúcsára {
        szín[u] = "fehér"
        szülő[u] = null
    }
    idő = 0
    for G minden u csúcsára {
        if (szín[u] === "fehér") {
            melysegiBejaras(u)
        }
    }
}

melysegiBejaras(u) {
    szín[u] = "szürke"
    idő++
    d[u] = idő // Ekkor értük el
    for u minden v szomszédjára {
        if (szín[v] === "fehér") {
            szülő[v] = u
            melysegiBejaras(v) // Azonnal már indulunk is el a talált csúcsból
        }
    }
    szín[u] = "fehete"
    ido++
    f[u] = ido // Ekkor hafytuk el
}
```

![ ](../img/melysegi.png)

###### Futásidő

A melysegiKereses() futásideje a melysegiBejaras() hívástól eltekintve <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(V)" />. A melysegiBejaras() hívások össz futásideje <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(E)" />, mert ennyi a szomszédsági listák összesített hossza. Így a futásidő <img src="https://render.githubusercontent.com/render/math?math=O(E%20%2B%20V)" />

> A futásidő azért lesz additív mingkét esetben, mert a szomszédsági listák össz hosszára tudjuk mondani, hogy <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(E)" />. Lehet, hogy ezt egyszerre nézzük végig, lehet, hogy eloszlatva, de **összessen** ennyi szomszédot vizsgál meg például a mélységiBejárás().

##### Minimális feszítőfák

Cél: megtalálni éleknek azon **körmentes** részhalmazát, amely élek mentén **minden csúcs összeköthető,** és az élek **összesített súlya** legyen a **lehető legkisebb**.

Az így kiválasztott élek egy fát alkotnak, ez a **feszítőfa**.

Két **mohó** algoritmus: **Prim**, **Kruskal**

###### Kruskal

A gráf csúcsait diszjunkt halmazokba sorolja. Kezdetben minden csúcs 1-1 egy elemú csúcs.

> Erre van speciális diszjunkt-halmaz adatszerkezet

Minden iterációban beveszi a legkisebb súlyú élet, aminek végpontjai különböző halmazokban vannak.

Ez által egy erdőt kezel, mit a végére egy fává alakít. Ez lesz a feszítőfa.

```js
kruskal(G, w) { // Az élsúlyokat megadó függvény
    A = 0
    for minden v csúcsra {
        halmaztKeszit(v)
    }
    for minden (u, v) élre, az élsúlyok szerin növekvő sorrendben {
        if halmaztKeres(u) != halmaztKeres(v) {
            A = A unió { (u, v) }
            egyesít(u, v)
        }
    }
}
```

`halmaztKeszit`, `halmaztKeres` és `egyesít` a diszjunkt halmazokat kezelő függvények.

![ ](../img/kruskal.png)

####### Futásidő

Az élek rendezése <img src="https://render.githubusercontent.com/render/math?math=O(E%20*%20logE)" />.

A halmaz műveletek a kezdeti értékadásokkal együtt <img src="https://render.githubusercontent.com/render/math?math=O((V%20%2B%20E)%20*%20%5Calpha%20*%20(V)" />. Ahol az <img src="https://render.githubusercontent.com/render/math?math=%5Calpha" /> egy nagyon lassan növekvő függvény, a diszjunkt-halmaz adatszerkezet jasátossága. Mivek összefüggő gráf esetén <img src="https://render.githubusercontent.com/render/math?math=O(%7CE%7C%20%5Cge%20%7CV%7C%20%2B%201)" />, így a diszjunkt-halmaz műveletek <img src="https://render.githubusercontent.com/render/math?math=O((E)%20*%20%5Calpha%20*%20(V))" /> idejűek. <img src="https://render.githubusercontent.com/render/math?math=%5Calpha(%7CV%7C)%20%3D%20O(log%20E)" /> miatt <img src="https://render.githubusercontent.com/render/math?math=O(E%20*%20log%20E)" />.

Így a teljes futásidő <img src="https://render.githubusercontent.com/render/math?math=O(E%20*%20logE)" />.

##### Prim algoritmus

A Kruskallal ellentétben folyamatosan egy darab fát kezel, ezt növeli az iterációkban.

Egy megadott kiindulási csúcsból indulva minden iterációban hozzávesszük azt a csúcsot, amit a legkisebb súlyú él köt a meglévő fához.

```js
prim(G, w, r) { // Az élsúlyokat megadó függvény
    for minden v csúcsra {
        kulcs[v] = Végtelen
        szülő[v] = null
    }
    kulcs[r] = 0
    Q = G csúcsai // Prioritási sor kulcs[] szerint minimális
    while Q nem üres {
        u = kiveszMin(Q)
        for u minden v szomszédjára {
            if v eleme Q, és w(u, v) < kulcs[v] {
                szülő[v] = u
                kulcs[v] = w(u, v)
            }
        }
    }
}
```

![ ](../img/prim.png)

####### Futásidő

Bináris minimum kupac megvalósítással:

Kezdeti értékadások: <img src="https://render.githubusercontent.com/render/math?math=O(V)" />

Egy db kiveszMin művelet: <img src="https://render.githubusercontent.com/render/math?math=O(logV)" />. Összesen: <img src="https://render.githubusercontent.com/render/math?math=O(V%20*%20log%20V)" />, mivel <img src="https://render.githubusercontent.com/render/math?math=V" />-szer fut le a ciklus.

Belső for ciklus <img src="https://render.githubusercontent.com/render/math?math=O(E)" />-szer fut, mivel szomszédsági listák hosszainak összege: <img src="https://render.githubusercontent.com/render/math?math=O(2%7CE%7C)" />. (Ez megintcsak additív, nem kell a külső ciklussal felszorozni, mert a szomszédsági listák alapján tudjuk, hogy ennyiszer fog maximum összesen lefutni.) Ezen a cikulson belül a <img src="https://render.githubusercontent.com/render/math?math=Q" />-hoz tartozás vizsgálata konstans idejű, ha erre fenntartunk egy jelölő bitet. A kulcs-nak való értékadás valójában egy kulcsotCsökkent művelet, ami <img src="https://render.githubusercontent.com/render/math?math=O(logV)" /> idejű.

Agy tehát az összesített futásidő: <img src="https://render.githubusercontent.com/render/math?math=O(VlogV%20%2B%20ElogV)%20%3D%20O(E%20log%20V)" />.

> Fibonacchi-kupaccal gyorsítható az algoritmus, ekkor a kiveszMin <img src="https://render.githubusercontent.com/render/math?math=O(logV)" />-s, kulcsotCsökkent <img src="https://render.githubusercontent.com/render/math?math=O(1)" />-es, teljes futásidő: <img src="https://render.githubusercontent.com/render/math?math=O(E%20%2B%20V%20*%20logV)" />

##### Legrövidebb utak

Lehetséges problémák:

- **Adott csúcsból induló legrövidebb utak problémája**: Egy adott kezdőcsúcsból meg szeretnénk találni minden másik csúcshoz vezető legrövidebb utat.

- **Adott csúcsba érkező legrövidebb utak problémája**: Minden csúcsból egy adott csúcsba. Ugyan az, mint az előbbi, ha az élek irányát megfordítjuk.

- **Adott csúcspár közti legrövidebb út problémája:** Ha az elsőt megoldjuk, ezt is megoldottuk. Nem ismert olyan algoritmus, ami aszimptotikusan gyorsabban megoldaná ezt a feladatot, de az elsőt nem.

- **Összes csúcspár közti legrövidebb utak problémája**: Ez persze megoldható lenne az elsővel, ha minden csúcsból elindítjuk, de ennél léteznek gyorsabb megoldások.

**Optimális részstruktúra**: Azt jelenti jelen esetben, hogy két csúcs közti legrövidebb út magában foglalja sokszor másik két csúcs közti legrövidebb utat. Az algoritmusok ezt használják ki.

**Negatív súlyú élek**: Lehetnek, de a gráf nem tartalmazhat **negatív összsúlyú kört**. Ugyanis ekkor nem definiált a legrövidebb út, hiszen a körön mégegyszer végig haladva mindig kisebb súlyú utat kapunk.

**Kör a legrövidebb útban**: Negatív összsúlyú tehát nem lehet, mert ekkor maga a feladat nem definiált. **Pozitív összsúlyú sem lehet**, hiszen ekkor jobban járnánk, ha nem járnánk be a kört. **Nulla összsúlyúnak pedig nincsen értelme**, hogy szerepeljen legrövidebb útban, hiszen ekkor ugyan annyi az összsúly a kör megtétele nélkül is. Tehát általánosságban feltételezhetjük, hogy a **legrövoidebb út nem tartalmaz kört**.

Két függvény, amit használni fognak az algoritmusok:

```js
egyForrasKezdoertek(G, s) { // Kezdőértékek beállítása, ha egy csúcsból indul
    for minden v csúcsra {
        f[v] = Végtelen
        szülő[v] = null
    }
    d[s] = 0
}


közelít(u, v, w) { // (u, v) él alapján v távolságának frissítése (ha u-ból jőve kisebb, akkor csökkentjük)
    if d[v] > d[u] + w(u, v) {
        d[v] = d[u] + w(u, v) // A d[v] becslést csökkenti
        szülő[v] = u
    }
}
```

###### Bellman-Ford algoritmus

**Lehetnek negatív élek**, ha van negatív összsúlyú él, azt felismeri az algoritmus, jelzi azzal, hogy hamissal tér vissza.

```js
bellmanFord(G, w, s) {
    egyForrasKezdoertek(G, s)
    for i = 1 to |V[G]| - 1 {
        for minden (u, v) élre {
            közelít(u, v, w)
        }
    }
    for minden (u, v) élre { // Itt ellenőrzi, hogy volt-e negatív kör
        if d[v] > d[u] + w(u, v) {
            return false
        }
    }
    return true
}
```

![  ](../img/belmann_ford.png)

####### Futásidő

<img src="https://render.githubusercontent.com/render/math?math=O(V%20*%20E)" /> hiszen a kezdőértékek beállítésa <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(V)" />, az egymásba ágyazott for ciklus <img src="https://render.githubusercontent.com/render/math?math=O(V%20*%20E)" />, a második ciklus pedig <img src="https://render.githubusercontent.com/render/math?math=O(E)" />.

###### Dijkstra algoritmusa

**Nemnegatív élsúlyok** esetén működik.

**S halmaz**: Azon csúcsok kerülnek bele, amikhez már meghatározta a legrövidebb utat a kezdőcsúcsból.

```js
dijkstra(G, s) {
    egyForrasKezdoertek(G, s)
    S = üresHalmaz
    Q = V[G] // Q minimum prioritási sor
    while Q nem üres {
        u = kiveszMin(Q)
        S = S unió { u }
        for u minden v szomszádjára {
            közelít(u, v, w)
        }
    }
}
```

A Q sorban azok a csúcsok vannak, amik nincsenek S-ben, tehát még nem tudjuk a hozzájuk vezető legrövidebb utat. A sort a <img src="https://render.githubusercontent.com/render/math?math=d" /> érték szerint azaz az ismert legrövidebb út szerint indexeljük.

![ ](../img/dijkstra.png)

####### Futásidő

Minden csúcs pontosan egyszer kerül át az <img src="https://render.githubusercontent.com/render/math?math=S" /> halmazba, emiatt amikor szomszédokat vizsgálunk, azt minden csúcsra egyszer tesszük meg, ezen szomszédok vizsgálata összesen <img src="https://render.githubusercontent.com/render/math?math=O(E)" />-szer fut le, mert ennyi a szomszédsági listák össz hossza. Így a közelít, és ez által a `kulcsotCsökkent` művelet legfejlebb <img src="https://render.githubusercontent.com/render/math?math=O(E)" />-szer hívódik meg.

Az összesített futásidő nagyban függ a **prioritási sor implementációtól**, a legegyszerűbb eset, ha egy **tömbbel implementáljuk**. Ekkor a `beszúr` és `kulcsotCsokkent` műveletek <img src="https://render.githubusercontent.com/render/math?math=O(1)" />-esek, a `kiveszMin` pedig <img src="https://render.githubusercontent.com/render/math?math=O(V)" />, mivel az egész tömbön végig kell menni. Így a teljes futásidő <img src="https://render.githubusercontent.com/render/math?math=O(V%5E2%20%2B%20E)" />.
**Ritkább gráfok esetén gyorsítható** az algoritmus **bináris kupac** implementációval, és látalánossagban gyorsítható fibonacchi kupaccal.

###### Floyd-Warshall algoritmus

**Dinamikus programozási** algoritmus legrövidebb utak **minden csúcspárra** problémára.

Lehetnek negatív élsúlyok, de negatív összsúlyú körök nem.

Az algoritmus lényege, hogy dinamikus programozással haladunk, egyre több csúcsot használunk fel, és azt figyeljük, hogy a két csúcs között vezető úton jobb eredményt érnénk-e el, ha az adott iteráció csúcsán keresztül mennénk.

Ez a következő rekurziós képlettel írható fel:

![ ](../img/flowd_warshall_keplet.png)

```js
floydWarshall(W) { // W szomszédsági mártix
    n = sorokSzama(W)
    D(0) = W
    for k = 1-től n-ig { // Ezt vizsgáljuk mindig majd, mint köztes csúcs
        for i = 1-től n-ig {
            for j = 1-től n-ig {
                d(k)[i, j] = min(
                    d(k - 1)[i, j],
                    d(k - 1)[i, k] + d(k - 1)[k, j]
                )
            }
        }
    }
}
```

A belső értékadás magyarázata: A k. iterációban a legrövidebb út, ami i-ből j-be vezet, az vagy a már megtalált k - 1-edik iterációbeli eredmény, vagy a az előzőz iterációbeli út i-ből k-ba, plusz k-ból j-be, azaz **felhasználjuk-e a k-t, mint egy köztesen érintett csúcsot**.

####### Futásidő

A három for ciklus határozza meg, mert annak a magja <img src="https://render.githubusercontent.com/render/math?math=O(1)" />-es, így a futásidő <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(n%5E3)" />, ahol <img src="https://render.githubusercontent.com/render/math?math=n" /> a sorok száma.

### 2. Elemi adatszerkezetek, bináris keresőfák, hasító táblázatok, gráfok és fák számítógépes reprezentációja

Az **adatszerkezet** adatok tárolására, és szervezésére szolgáló módszer, amely lehetővé teszi a hatékony hozzáférést és módosítést.

Algoritmushoz válasszuk ki az adatszerkezetet. Előfordulhat, hogy az algoritmus a megfelelő adatszerkezeten alapul.

**Absztrakt adatszerkezet**: műveletek által definiált adaszerkezet, nem konkrét implementáció.

**Adatszerkezetek**: Absztrakt adatszerkezetek konkrét megvalósításai. Általában egyes implementációk egyes műveleteket gyorsabban, míg másokat lassaban tudnak végrehajtani. Ez alapján kell az algoritmushoz kiválasztani a megfelelőt.

> Absztrakt adatszerkezetek olyanok, mint **interfészek**, az adatszerkezetek pedig azt implementáló **osztályok**.

#### Listák

Absztrakt adatszerkezet.

Benne az adatok lineárisan követik egymást, egy kulcs többször is előfordulhat benne.

| Művelet            | Magyarázat                                                        |
| ------------------ | ----------------------------------------------------------------- |
| `ÉRTÉK(H, i)`      | `i`. pozíción (index-en) a kulcs értékének visszaadása            |
| `ÉRTÉKAD(H, i, k)` | `i`. pozíción levő értéknek a `k` érték értéküladása              |
| `KERES(H, k)`      | A `k` kulcs (érték) megkerekéke a listában, indexének visszaadása |
| `BESZÚR(H, k, i)`  | Az `i`-edik pozíctó után a `k` beszúrása                          |
| `TÖRÖL(H, k)`      | Első `k` értékű elem törlése                                      |

##### Közvetlen elérésű lista

Összefüggő memóriaterületet foglalunk le, így minden index közvetlen elérésű.

| Művelet            | Futásidő |
| ------------------ | -------- |
| `ÉRTÉK(H, i)`      | <img src="https://render.githubusercontent.com/render/math?math=O(1)" />   |
| `ÉRTÉKAD(H, i, k)` | <img src="https://render.githubusercontent.com/render/math?math=O(1)" />   |
| `KERES(H, k)`      | <img src="https://render.githubusercontent.com/render/math?math=O(n)" />   |
| `BESZÚR(H, k, i)`  | <img src="https://render.githubusercontent.com/render/math?math=O(n)" />   |
| `TÖRÖL(H, k)`      | <img src="https://render.githubusercontent.com/render/math?math=O(n)" />   |

> Beszúrásnál újra kellhet allokálni egyel nagyobb emmóriaterületet.

> Jellemzően úgy implementáljuk, hogy definiálunk egy **kapacitást**, és amikor kell, akkor eggyivel allokálunk többet az új memóriaterületen. Illetve jellemzően azt is definiáljuk, hogy mikor kell zsugorítani a területet, azaz hány üresen maradó cella esetén (nem lyukak! az nem lehet, csak a terület végén levő üres cellák) allokáljunk kevesebb területet.

**Előnye**: O(1)-es indexelés.

**Hártánya**: Módosító műveletek lassúal, egy nagy memóriablokk kell.

##### Láncolt lista

Minden kulcs mellett tárolunk egy mutatót a következő, és egy mutatót a megelőző elemre.

**Egyszeresen láncolt lista**: csak a következőre tárolunk mutatót.

**Kétszeresen láncolt lista**: Következőre, előzőre is tárolunk mutatót.

**Ciklikus lista**: Utolsó elem rákövetkezője az első elem, első megelőzője az uolsó elem.

**Őrszem / fej**: Egy NULL elem, ami mindig a lista eleje.

| Művelet            | Futásidő |
| ------------------ | -------- |
| `ÉRTÉK(H, i)`      | <img src="https://render.githubusercontent.com/render/math?math=O(n)" />   |
| `ÉRTÉKAD(H, i, k)` | <img src="https://render.githubusercontent.com/render/math?math=O(n)" />   |
| `KERES(H, k)`      | <img src="https://render.githubusercontent.com/render/math?math=O(n)" />   |
| `BESZÚR(H, k, i)`  | <img src="https://render.githubusercontent.com/render/math?math=O(1)" />   |
| `TÖRÖL(H, k)`      | <img src="https://render.githubusercontent.com/render/math?math=O(1)" />   |

> Beszúrás, és törlés valójában <img src="https://render.githubusercontent.com/render/math?math=O(n)" />. Csak akkor <img src="https://render.githubusercontent.com/render/math?math=O(1)" />, ha már a megfelelő pozíción vagyunk, azaz már tudjuk, melyik mutatókat kell átírni.

**Előnye**: Nem egy nagy összefüggő memória blokk kell.

**Hártánya**: Nem lehet gyorsan indexelni. Tárigény szempontjából rosszabb, minden kulcs mellett tárolunk legalább egy mutatót.

#### Verem

Lista, amiben csak a legutoljára beszúrt elemet lehet kivenni. (**LIFO**)

Emiatt a speciális művelet végzés miatt gyorsabb, mint a sima lista.

Alkalmazásokra pl.: Függvényhívások veremben, undo-redo, böngésző előzmények.

##### Verem megvalósítás fix méretű tömbbel

Fenntartunk egy mutatót a verem tetejére, eddig van feltöltve a lefoglalt memóriaterület. (A verem alja a 0. index.)

```js
üresVerem(V) {
    return tető[V] == 0
}
```

```js
verembe(V, x) {
    tető[V]++ // Tető mutató frissítése, hiszen egyel több elem lesz
    V[tető[V]] = x
}
```

```js
veremből(V) {
    if üresVerem(V) {
        throw Error("alulcsordulás")
    } else {
        tető[V]--
        return V[tető[V] + 1] // Ez az index nincs felszabadítva, vagy átírva, egyszerűen a mutató van csökkentves
    }
}
```

Mind a 3 művelet <img src="https://render.githubusercontent.com/render/math?math=O(1)" />-es, hiszen csak indexeléseket, értékadásokat tartalmaznak.

> Hasonlóan a tömbbel megvalósított listához, itt is érdemes lehet kapacitást meghatározni.

#### Sor

Mindig a legelőször beszúrt elemet lehet kivenni. (**FIFO**)

Lefoglalunk egy valamekkora egybefüggő memória szegmenst, de nem mindig használjuk az egészet. Két mutatót tartunk fent, a `fej` és a `vége` mutatókat, ezek jelölik, hogy éppen mekkora részét használjuk a lefoglalt területnek sorként.

```js
sorba(S, x) {
    S[vége[S]] = x // A vége egy üres pozícióra mutat alapból, ezért növeljük utólag.
    if vége[S] = hossz[S] {
        vége[S] = 1 // Ekkor "körvefordult" a sor a lefoglalt memóriaterületen.
    } else {
        vége[S]++
    }
}
```

```js
sorból(S) {
    x = S[fej[S]] // A fej mutat a sor "elejére", azaz a legrégebben betett elemre.
    if fej[S] == hossz[S] {
        fej[S] = 1 // Ekkor "körvefordult" a sor a lefoglalt memóriaterületen.
    } else {
        fej[S]++
    }
}
```

Mind a két művelet <img src="https://render.githubusercontent.com/render/math?math=O(1)" />-es, hiszen csak indexeléseket, értékadásokat tartalmaznak.

#### Prioritási sor

Absztrakt adatszerketet.

Nem a kulcsok beszúrásának sorrendje határozza meg, mit lehet kivenni, hanem mindig a maximális (vagy minimális) kulcsú elemet tudjuk kivenni.

| Művelet         | Magyarázat                                      |
| --------------- | ----------------------------------------------- |
| `BESZÚR(H, k)`  | Új elem beszúrása a prioritási sorba            |
| `MAX(H)`        | Maximális kulcs értékének visszaadása           |
| `KIVESZ-MAX(H)` | Maximális kulcsú elem kivétele (vagy minimális) |

##### Kupac

Hatékony **prioritási sor megvalósítás**.

A kupac egy **majdnem teljes bináris fa**, amiben minden csúcs értéke legalább akkora, mint a gyerekeié, ezáltal a maximális (minimális) kulcsú elem a gyökérben van.

Majdnem teljes bináris fa alatt azt értjük, hogy a fa legmélyebb szintjén megengedett, hogy balról jobbra haladva egyszer csak már ne álljon fenn a bináris fa tulajdonság.

###### Tömbös megvalósítás

Egybefüggő memóriaterületen van a teljes kupac.

A **szülő**, a **bal gyerek**, és a **jobb gyerek** gyorsan számolható a tömb indexelésével.

```js
szülő(i) { // i indexő elem szülője
    return alsoEgeszResz(i / 2)
}
```

```js
balGyerek(i) { // i indexű elem bal gyereke
    return 2i
}
```

```js
jobbGyerek(i) { // i indexű elem jobb gyereke
    return 2i + 1
}
```

```mermaid
graph TD;
    100 --> 50;
    100 --> 40;
    50 --> 20
    50 --> 10
    40 --> 30
    40 --> 25
    20 --> 5
    10 --> 7
    20 --> 6
```

Ennek a kupacnak a tömbös reprezentációja:

```js
[100, 50, 40, 20, 10, 25, 30, 5, 6, 7];
```

####### Kupactulajdonság fenntartása

Garanálnunk kell, hogy az egyes beszúrások, kivételek után a kupacra jellemző tulajdonságok fennmaradnak.

A tulajdonság fenntartására ez a függvény fog felelni:

```js
maximumKupacol(A, i) {
    l = balGyerek(i)
    r = jobbGyerek(i)
    if l <= kupacMéret[A] és A[l] > A[i] { // l <= kupacMéret[A] ellenőrzés csak azért kell, hogy az A[l] indexelés biztonságos legyen.
        legnagyobb = l
    } else {
        legnagyobb = i
    }
    if r <= kupacMéret[A] és A[r] > A[i] { // r <= kupacMéret[A] ellenőrzés csak azért kell, hogy az A[r] indexelés biztonságos legyen.
        legnagyobb = r
    }
    if legnagyobb != i {
        csere(A[i], A[legnagyobb])
        maximumKupacol(A, legnagyobb)
    }
}
```

Tehát a vizsgált indexű elem et összehasonlítjuk a gyerekeivel, és ha valamelyik nagyobb, akkor azzal kicseréljük, és rekurzívan meghívjuk rá a `maximumKupacol()`-t, mert lehet, az új szülőjénél/gyerekénél is nagyobb.

`maximumKupacol()` futásideje <img src="https://render.githubusercontent.com/render/math?math=O(logn)" />, mert ennyi a majdnem teljes bináris fa mélysége, és legrosszabb esetben az egészen végig kell lépkedni.

####### Maximum lekérése

A prioritási sor `MAX(H)` függvényének megvalósítása egyszerű, csak vissza kell adnunk a tömb első elemét, ami a kupac gyökere.

```js
kupacMaximuma(A) {
    return A[1]
}
```

####### Maximum kivétele

Ilyenkor az történik, hogy a kupac utolsó elemét áthelyezzük a gyökérbe, és a gyökérből indulva helyreállítjuk a kupac tulajdonságot, "lekupacoljuk" az elemet.

```js
kupacbólKiveszMaximum(A) {
    if kupacMéret[A] < 1 {
        throw Error("kupacméter alulcsordulás")
    }
    max = A[1]
    A[1] = A[kupacMéret[A]]
    kupacMéret[A]-- // Méter csökkentése, az érték a memóriában marad, csak nem értelmezzük a kupac részeként.
    maxumimKupacol(A, 1) // Mivel beszúrtuk ide az utolsó elemet, helyre kell állítani ("lefelé kupacolni")
    return max
}
```

####### Beszúrás

Új elem beszúrása egyszerű, csak szúrjuk be a kupac végére, és onnan kiindulva végezzünk egy helyreállítást, ezzel az új elemet a helyére "felkupacolva".

```js
kupacbaBeszur(A, x) {
    kupacMéter[A]++
    A[kupacMéret[A]] = x
    maximumKupacol(A, kupacMéret[A])
}
```

####### Futásidők

| Művelet         | Futásidő    |
| --------------- | ----------- |
| `BESZÚR(H, k)`  | <img src="https://render.githubusercontent.com/render/math?math=O(logn)" />   |
| `MAX(H)`        | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(1)" /> |
| `KIVESZ-MAX(H)` | <img src="https://render.githubusercontent.com/render/math?math=O(logn)" />   |

#### Fák, és számítógépes reprezenzációjuk

##### Fa

- Összefüggő, körmentes gráf

- Bármely két csúcsát pontosan egy út köti össze

- Elsőfokú csúcsi: **levél**

- Nem levél csúcsai: **belső csúcs**

###### Bináris fa

- **Gyökeres fa**: Van egy kitűntetett gyökér csúcsa

- **Bináris fa**: Gyökeres fa, ahol minden csúcsnak legfeljebb két gyereke van.

##### Számítógépes reprezentáció

Csúcsokat, és éleket reprezentálunk.

Maga a fa objektumunk egy mutató a gyükérre.

###### Gyerek éllistás reprezentáció

```java
class Node {
    Object key;
    Node parent;
    List<Node> children; // Gyerekek éllistája
}
```

###### Első fiú - apa - testvér reprezentáció

```java
class Node {
    Object key;
    Node parent;
    Node firstChild;
    Node sibling;
}
```

###### Bináris fa reprezentációja

```java
class Node {
    Object key;
    Node parent;
    Node left;
    Node right;
}
```

> Mindegyik esetben, ha nincs Node, akkor NULL-al jelezhetjük. Pl. a gyökér szülője esetében.

#### Bináris keresőfák

Absztrakt adatszerkezet a következő műveletekkel:

| Művelet                           | Magyarázat                                                                        |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `KERES(T, x)`                     | Megkeresi a fában az `x` kulcsot, és visszaadja azt a csúcsot                     |
| `BESZÚR(T, x)`                    | Fába az `x` kulcs beszúrása                                                       |
| `TÖRÖL(T, x)`                     | Fából az `x` kulcsú csúcs törlése                                                 |
| `MIN(T)` / `MAX(T)`               | A fa maximális, vagy minimális kulcsú csúcsának visszaadása                       |
| `KÖVETKEZŐ(T, x)` / `ELŐZŐ(T, x)` | A fában az `x` kulcsnál egyel nagyobb, vagy egyel kisebb értékű csúcs visszaadása |

> A `T` a fa gyökerére mutató mutató.

> Cél: Minden művelet legalább <img src="https://render.githubusercontent.com/render/math?math=O(logn)" />-es legyen

##### Bináris keresőfa tulajdonság

Egy <img src="https://render.githubusercontent.com/render/math?math=x" /> csúcs értéke annak a bal részfájában minden csúcsnál nagyobb vagy egyenlő, jobb részfájában minden csúcsnál kisebb vagy egyenlő.

##### Keresés

A bináris fa tulajdonságot kihasználva fa keresendő kulcsot hasonlítgatjuk a bal, jobb gyerekekhez, és ennek megfelelően lépünk jobbra / balra.

```js
fábanKeres(x, k) {
    while x != NULL és k != kulcs[x] {
        if k < kulcs[x] {
            x = bal[x]
        } else {
            x = jobb[x]
        }
    }
    return x
}
```

##### Minimum / Maximum keresés

A minimum elem a "legbaloldali" elem

```js
fábanMinimum(x) {
    while bal[x] != NULL {
        x = bal[x]
    }
    return x
}
```

A maximum elem a "legjobboldali" elem

```js
fábanMaximum(x) {
    while jobb[x] != NULL {
        x = jobb[x]
    }
    return x
}
```

##### Következő / Megelőző

```js
fábanKövetkező(x) {
    if jobb[x] == NULL {
        return fábanMinimum(jobb[x])
    }
    y = szülő[x]
    while y != NULL és x == jobb[y] {
        x = y
        y = szülő[y]
    }
    return y
}
```

Azaz, ha van jobb részfája a fának, amiben keresünk, akkor annak a mimimuma a rákövetkező, ha nincs, akkor pedig addig lépkedünk fel, amíg az aktuális csúcs a szülőjének bal gyereke nem lesz, ugyanis ekkor a szülő a rákövetkező.

TODO: Hasonlóan a megelőzőre.

##### Beszúr

```js
fábaBeszúr(T, z) {
    y = null
    x = gyökér[T]
    while x != null {
        y = x
        if kulcs[z] < kulcs[x] {
            x = bal[x]
        } else {
            x = jobb[x]
        }
    }
    szülő[z] = y
    if y = null {
        gyökér[T] = z
    } else if kulcs[z] < kulcs[y] {
        bal[y] = z
    } else {
        jobb[y] = z
    }
}
```

Tehát megkeressük az új elem helyét, az által, hogy jobbra, balra lépkedünk, majd beszúrjuk a megfelelő csúcs alá jobbra, vagy balra.

##### Töröl

```js
fábólTöröl(T, z) {
    if bal[z] == null vagy jobb[z] == null {
        y = z
    } else {
        y = fábanKövetkező(z)
    }

    if bal[y] != null {
        x = bal[y]
    } else {
        x = jobb[y]
    }

    if x != null { // x akkor null, ha y = fábanKövetkező(z)
        szülő[x] = szülő[y] // "átkötés"
    }

    if szülő[y] == null {
        gyökér[T] = x // Ha gyökérbe lett kötve az y, akkor ezt is frissítjük
    } else if y == bal[szülő[y]] {
        bal[szülő[y]] = x // "átkötés"
    } else {
        jobb[szülő[y]] = x // "átkötés"
    }

    if y != x {
        kulcs[z] = kulcs[y]
    }

    return y
}
```

###### Levél törlése

Ha a kitörlendő csúcs egy levél, akkor egyszerűen kitöröljük azt, a szülőkénél a rá mutató mutatót `null`-ra állítjuk.

###### Egy gyerekes belső csúcs

Ebben az esetben a törlendő csúcs helyére bekötjük annak a részfáját ()amiből, mivel egy gyereke van, csak egy van).

###### Két gyerekes belső csúcs

Ebben az esetben a csúcs helyére kötjük annak a rákövetkezőjét. Mivel ebben az esetben van biztosan jobb gyereke, így a jobb gyerekének a minimumát fogjuk a helyére rakni (ami mivel egy levél, csak egyszerűen törölhetjük az eredeti helyéről).

##### Futásidők

Az összes művelet (`KERES`, `MAX / MIN`, `BESZÚR`, `TÖRÖL`, `KÖVETKEZŐ / ELŐZŐ`) <img src="https://render.githubusercontent.com/render/math?math=O(h)" />-s, azaz a fa magasságával arányos. Ez alap esetben nem feltétlen olyan jó, de kiegyensúlyozott fák esetén jó, hiszen akkor <img src="https://render.githubusercontent.com/render/math?math=O(logn)" />-es.

> Pl. AVL-fa, bináris kereső fa kiegyensúlyozott.

#### Halmaz

Absztrakt adatszerkezet.

Egy elem legfejlebb egyszer szerepelhet benne.

| Művelet                                | Magyarázat                         |
| -------------------------------------- | ---------------------------------- |
| `TARTALMAZ(k)` (lényegében `KERES(k)`) | Benne van-e egy e `k` a halmazban? |
| `BESZÚR(K)`                            | Elem behelyezése a halmazba.       |
| `TÖRÖL(K)`                             | Elem törlése a halmzból.           |

> Egyéb extra műveletek definiálhatóak, pl.: `METSZET`, `UNIÓ`

##### Közvetlen címzésű táblázat

Egy akkora tömb lefoglalása, mint amekkora a teljes érték univerzum mérete, és ha egy szám eleme a halmaznak, egyszerűen beírjuk ezt a megfelelő indexre.

Jó, mert nagyon gyors megoldás.

Viszont nagy probléma, hogy a tárigény az univerzum méretével arányos, nem pedig a ténylegesen felhasznált elemekkel.

Kis méretű univerzum esetén ajánlatos csak.

#### Szótár

Absztrakt adatszerkezet.

Egy halmaz elemeihez (kulcsok) egy-egy érték tartozik. Kulcs egyedi, érték ismétlődhet.

> dict, asszociatív tömb, map

#### Hasító tábla

Szótár, és halmaz hatékony megvalósítása.

Cél.: `TARTALMAZ`, `BESZÚR`, `TÖRÖL` műveletek legyenek gyorsak.

##### Hasító függvény

Kulcsok <img src="https://render.githubusercontent.com/render/math?math=U" /> univerzumának elemeit (lehetséges kulcsokat) képezi le a hasító táblázat **rés**eire.

Pl.: <img src="https://render.githubusercontent.com/render/math?math=h(k)%20%3D%20k%20~%20mod%20~%20m" />

<img src="https://render.githubusercontent.com/render/math?math=k" /> a hasító táblázat mérete, azaz a **rések száma**.

Mivel az unicerzum, a lehetséges kulcsok száma nagyobb, mint réseké (különben csinálhatnánk tömbös megvalósítást), így elkerülhetetélen, hogy ürközések legyenek, azaz hogy a hasító függvény két kulcsot ugyan arra a résre képezzen le.

Ezeket az **ütközéseket fel kell oldani**.

##### Ütközésfeloldás láncolással

A résekben láncolt listák vannak.

Ha olyan helyre akarunk beszúrni, ahol már van elem, akkor a lista elejére szúrjuk be az újat (ez konstans idejű).

**Keresés, törlés valamivel romlik**, hiszen egy lsitán is végig kelhet menni.

Kitöltési tényező: <img src="https://render.githubusercontent.com/render/math?math=%5Calpha%20%3D%20%5Cfrac%7Bn%7D%7Bm%7D" /> (**láncok átlagos hossza**)

<img src="https://render.githubusercontent.com/render/math?math=m" />: rések száma

<img src="https://render.githubusercontent.com/render/math?math=n" />: elemek a táblában

**Egyszerű egyenletes hasítási feltétel**: Minden elem egyforma valószínűséggel képződik le bármelyik résre.

Ha egy hasító függvény ezt biztosítja, akkor a keresések (mind sikeres, mind sikertelen) átlagos ideje (nem legrosszabb!) <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(1%20%2B%20%5Calpha)" />

Ha tudjuk, mennyi elem lesz a táblában, akkor meg tudjuk választani a rések számát úgy, hogy az <img src="https://render.githubusercontent.com/render/math?math=%5Calpha" /> egy konstans legyen, ekkor `KERES`, `TÖRÖL`, `BESZÚR` mind <img src="https://render.githubusercontent.com/render/math?math=O(1)" />.

#### Gráfok számítógépes reprezentációja

![ ](../img/graf_abrazolas.png)

- Csúcsok + élek halmaza

- Szomszédsági mártix

- Szomszédsági lista

|                        | Létezik (u, v) él?       | Összes él listázása | Egy csúcs szomszédainak listázása |
| ---------------------- |:------------------------:|:-------------------:|:---------------------------------:|
| Csúcsok + élek halmaza | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(%5C%7CE%5C%7C)" />          | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(%5C%7CE%5C%7C)" />     | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(%5C%7CE%5C%7C)" />                   |
| Szomszédsági mátrix    | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(1)" />              | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(%5C%7CV%5C%7C%5E2)" />   | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(%5C%7CV%5C%7C)" />                   |
| Szomszédsági lista     | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(%5Ctext%7Bfoksz%C3%A1m%7D)" /> | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(%5C%7CE%5C%7C)" />     | <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(%5Ctext%7Bfoksz%C3%A1m%7D)" />          |

Érdemes mindig elgondolkodni, hogy milyen reprezentációt választunk, az alapján, hogy milyen gráfogkra számítunk, azaz várhatóan milyen az élek és csúcsok eloszlása, azaz mennyire ritka / sűrű a gráf. Ha az élek száma arányos a csúcsok számával, az egy sűrű gráf, ha az élek száma arányos a csúcsok számának négyzetével, az egy ritka gráf.
## Bonyolultságelmélet

### 1. Hatékony visszavezetés. Nemdeterminizmus. A P és NP osztályok. NP-teljes problémák.

### A P osztály

R az eldönthető problémák osztálya.

Polinomidőben eldönthető problémák osztálya.

Tehát minden olyan **eldöntési probléma** P-ben van, amire létezik <img src="https://render.githubusercontent.com/render/math?math=O(n%5Ek)" /> időigényű algoritmus, valamely konstans <img src="https://render.githubusercontent.com/render/math?math=k" />-ra.

> Ezeket a problémákat tartjuk **hatékonyan megoldhatónak**.

#### Elérhetőség

P-beli probléma.

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=G%20%3D%20(V%2C%20E)" /> irányított gráf. Feltehető, hogy <img src="https://render.githubusercontent.com/render/math?math=V%20%3D%20%5C%7B%20~%201%2C%20...%2C%20N%20~%20%5C%7D" />

**Output**: Vezet-e <img src="https://render.githubusercontent.com/render/math?math=G" />-ben (irányított) út <img src="https://render.githubusercontent.com/render/math?math=1" />-ből <img src="https://render.githubusercontent.com/render/math?math=N" />-be?

Erre van algoritmus:

- Kiindulásnak veszünk egy <img src="https://render.githubusercontent.com/render/math?math=X%20%3D%20%5C%7B1%5C%7D" /> és <img src="https://render.githubusercontent.com/render/math?math=Y%20%3D%20%5C%7B1%5C%7D" /> halmazt.

- Mindig kiveszünk egy elemet <img src="https://render.githubusercontent.com/render/math?math=X" />-ből, és annak szomszédait betesszük <img src="https://render.githubusercontent.com/render/math?math=X" />-be, és <img src="https://render.githubusercontent.com/render/math?math=Y" />-ba is.

- Ez által <img src="https://render.githubusercontent.com/render/math?math=X%20%5Ccup%20Y" />-ban lesznek az <img src="https://render.githubusercontent.com/render/math?math=1" />-ből elérhető csúcsok.

Erre a konkrét implementációnk futásideje változó lehet, függhet például a gráf repretenzációtól, és a halmaz adatszerjezet megválasztásától. De a lényeg, hogy van-e polinom idejű algoritmus, és mivel általánosságban <img src="https://render.githubusercontent.com/render/math?math=O(N%5E3)" />-el számolhatunk legrosszabb esetnek (előnytelen implementáció esetén is bele férünk), így <img src="https://render.githubusercontent.com/render/math?math=O(n%5E3)" />-ös a futásideje az algoritmusnak (hiszen <img src="https://render.githubusercontent.com/render/math?math=N%20%5Cle%20n" />, mert biztosan kevesebb a csúcsok száma, mint a gráfot ábrázoló biteké).

#### Hatékony visszavezetés

##### Rekurzív visszavezetés

> A.K.A. Turing-visszavezetés

Az <img src="https://render.githubusercontent.com/render/math?math=A" /> eldöntési probléma **rekurzívan visszavezethető** a <img src="https://render.githubusercontent.com/render/math?math=B" /> eldöntési problémára, jelben <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cle_R%20B" />, ha van olyan <img src="https://render.githubusercontent.com/render/math?math=f" /> **rekurzív függvény**, mely <img src="https://render.githubusercontent.com/render/math?math=A" /> inputjaiból <img src="https://render.githubusercontent.com/render/math?math=B" /> inputjait készíti **választartó** módon, azaz minden <img src="https://render.githubusercontent.com/render/math?math=x" /> inputra <img src="https://render.githubusercontent.com/render/math?math=A(x)%20%3D%20B(f(x))" />

> Itt a _rekurzió_ azt jelenti, hogy kiszámítható, adható rá algoritmus.

Ebben az esetben ha <img src="https://render.githubusercontent.com/render/math?math=B" /> eldönthető, akkor <img src="https://render.githubusercontent.com/render/math?math=A" /> is eldönthető, illetve ha <img src="https://render.githubusercontent.com/render/math?math=A" /> eldönthetetlen, akkor <img src="https://render.githubusercontent.com/render/math?math=B" /> is eldönthetetlen.

Lényegében ez azt fejezi ki, hogy "<img src="https://render.githubusercontent.com/render/math?math=B" /> legalább olyan nehéz, mint <img src="https://render.githubusercontent.com/render/math?math=A" />".

**Probléma ezzel a megközelítéssel**: Ha <img src="https://render.githubusercontent.com/render/math?math=A" /> eldönthető probléma, <img src="https://render.githubusercontent.com/render/math?math=B" /> pedig nemtriviális, akkor <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cle_R%20B" />.

- Tehát nehézség szempontjából nem mondtunk valójában semmit.

- Ennek oka, hogy ebben az esetben az <img src="https://render.githubusercontent.com/render/math?math=f" /> inputkonvertáló függvényben van lehetőségünk egyszerűen az <img src="https://render.githubusercontent.com/render/math?math=A" /> probléma megoldására, és ennek megfelelően <img src="https://render.githubusercontent.com/render/math?math=B" /> egy _igen_, vagy _nem_ példányának visszaadására.

- Ez alapján az összes nemtriviális probléma (azaz az olyanok, amik nem minden inputra ugyan azt adják) "ugyan olyan nehéznek" tűnik.

- Probléma oka: **Túl sok erőforrást engedünk meg az inputkonverzióhoz**, annyit, ami elég magának a problémának a megoldására.

- Megoldás: Hatékony visszavezetés.

##### Hatékony visszavezetés

> A.K.A. Polinomidejű visszavezetés

Az <img src="https://render.githubusercontent.com/render/math?math=A" /> eldöntési probléma **hatékonyan visszavezethető** a <img src="https://render.githubusercontent.com/render/math?math=B" /> eldöntési problémára, jelben <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cle_P%20B" />, ha van olyan <img src="https://render.githubusercontent.com/render/math?math=f" /> **polinomidőben kiszámítható** függvény, mely <img src="https://render.githubusercontent.com/render/math?math=A" /> inputjaiból <img src="https://render.githubusercontent.com/render/math?math=B" /> inputjait készíti **választartó** módon.

Ekkor ha <img src="https://render.githubusercontent.com/render/math?math=B" /> **polinomidőben** eldönthető, akkor <img src="https://render.githubusercontent.com/render/math?math=A" /> is eldönthető **polinomidőben**, illetve ha <img src="https://render.githubusercontent.com/render/math?math=A" />-ra nincs polinomidejű algoritmus, akkor <img src="https://render.githubusercontent.com/render/math?math=B" />-re sincs.

##### Példa

Egy példa a hatékony visszavezetésre a <img src="https://render.githubusercontent.com/render/math?math=P%C3%81ROS%C3%8DT%C3%81S%20%5Cle%20SAT" />

###### PÁROSÍTÁS

**Input**: Egy **CNF** (konjunktív normálformájú formula)

**Output**: Kielégíthető-e?

> Azaz van-e olyan értékadás, ami mellett igaz a formula?

###### SAT

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=G" /> gráf

**Output**: Van-e <img src="https://render.githubusercontent.com/render/math?math=G" />-ben teljes párosítás?

> Közös csúccsal nem rendelkező élek halmaza, amik lefednek minden csúcsot.

###### Visszavezetés

Tehát a cél egy <img src="https://render.githubusercontent.com/render/math?math=G" /> gráfból egy <img src="https://render.githubusercontent.com/render/math?math=%5Cphi_G" /> CNF előállítása választartó módon, polinomidőben úgy, hogy **<img src="https://render.githubusercontent.com/render/math?math=G" />-ben pontosan akkor legyen teljes párosítás, ha <img src="https://render.githubusercontent.com/render/math?math=%5Cphi_G" /> kielégíthető**.

- Minden élhez rendelünk egy logikai változót.

- Akkor lesz igaz a változó, ha beválasztjuk az élt a teljes párosításba.

- A cél egy olyan CNF előállítása, amiben a következőt formalizáljuk: Minden csúcsra felítjuk, hogy pontosan egy él illeszkedik rá, majd ezeket összeéseljük. Ha így egy csúcsra sikerül megfelelő CNF-et alkotni, akkor azok összeéselése is CNF, hiszen CNF-ek éselése CNF.

- Egy csúcshoz annak formalizálása, hogy pontosan egy él fedi: legalább egy él fedi ÉS legfeljebb egy él fedi.
  
  - Legalább egy: Egyetlen CNF kell hozzá: <img src="https://render.githubusercontent.com/render/math?math=(x_1%20%5Clor%20x_2%20%5Clor%20...%20%5Clor%20x_k)" />.
  
  - Legfeljebb egy: Négyzetesen sok klóz kell hozzá, minden csúcspárra megkötjük, hogy "nem ez a kettő egyszerre": <img src="https://render.githubusercontent.com/render/math?math=%5Cland%20~%201%20%5Cle%20i%20%3C%20j%20%5Cle%20k%20~%20%5Cneg(x_i%20%5Cland%20x_j)" />

> <img src="https://render.githubusercontent.com/render/math?math=x_1%2C%20...%2C%20x_k" /> az adott viszgált csúcsra illeszkedő élek.

![ ](../img/hatekony_visszavezetes_1.png)

![ ](../img/hatekony_visszavezetes_2.png)

#### Nemdeterminizmus

**Nemrealisztukus** számítási modell: Nem tudjuk hatékonyan szimulálni.

RAM gépen el lehet képzelni a következő utasításképp: `v := nd()`.

Ezzel nemdeterminisztikusan adunk értéket egy bitnek, amit úgy lehet elképzelni, mintha ezen a ponton a számítás elágazna, és az egyik szálon `v = 1`, a másikon `v = 0` értékkel számol. Egy ilyen elégazásnak konstans időben kellene történnie.

![ ](../img/nemdeterminizmus.png)

A fenti képen egy **számítási fa** van, minden elégazás egy nemdeterminisztikus bitgenerálás.

**Időigény**: A leghosszabb szál időigénye. Tehát a **számítási fa mélysége**.

**Eldöntési algoritmus** esetén a végeredmény akkor **true, ha legalább egy szál true,** akkor **false, ha minden szál false**.

##### Nemdeterminisztikus algoritmus a SAT-ra

Input formulánkban az <img src="https://render.githubusercontent.com/render/math?math=x_1%2C%20...%2C%20x_k" /> változók fordulnak elő.

1. Generáljunk minden <img src="https://render.githubusercontent.com/render/math?math=x_i" />-hez egy nemdeterminisztikus bitet, így kapunk egy értékadást.

2. Ha a generált értékadás kielégíti a formulát, adjunk vissza `true`-t, egyébként `false`-t.

Példa input: <img src="https://render.githubusercontent.com/render/math?math=(x_1%20%5Clor%20%5Cneg%20x_2)%20%5Cland%20(x_2%20%5Clor%20%5Cneg%20x_3)%20%5Cland%20(%5Cneg%20x_1%20%5Clor%20x_3)" />

Ehhez az inputhoz a számítási fa:

![ ](../img/szamitasi_fa.png)

Ennek az algoritmusnak a nemdeterminisztikus időigénye <img src="https://render.githubusercontent.com/render/math?math=O(n)" />, hiszen <img src="https://render.githubusercontent.com/render/math?math=n" /> változónak adunk értéket, és a behelyettesítés, ellenőrzés is lineáris időigényű.

#### Az NP osztály

**Nemdeterminisztikus algoritmussal polinomidőben** eldönthető problémák osztálya.

A **SAT** a korábbi példa alapján például **NP-beli**.

<img src="https://render.githubusercontent.com/render/math?math=P%20%5Csubseteq%20NP" /> természetesen igaz, hiszen egy determinisztikusan polinom idejű algoritmus felfogható olyan nemdeterminisztikusnak, ami sosem ágazik el. <img src="https://render.githubusercontent.com/render/math?math=P%20%3D%20coP" /> miatt <img src="https://render.githubusercontent.com/render/math?math=P%20%5Csubseteq%20NP%20%5Ccap%20coNP" />.

Ennél többet nem tudunk, nem tudjuk, hogy <img src="https://render.githubusercontent.com/render/math?math=P%20%3D%20NP" /> igaz-e. Széleskörben elfogadott sejtés, hogy nem. Hasonlóan az sem ismert, hogy <img src="https://render.githubusercontent.com/render/math?math=NP%20%3D%20coNP" /> igaz-e, erről is az az elfogadtott álláspont, hogy nem.

Persze <img src="https://render.githubusercontent.com/render/math?math=NP%20%5Csubseteq%20R" /> is igaz, mert a nemdeterminisztikus számítás szimulálható determinisztikusan, bár ez exponenciálisan lassú.

![ ](../img/bonyolultsagi_osztalyok.png)

#### NP-teljes problémák

**<img src="https://render.githubusercontent.com/render/math?math=C" />-teljesség definíciója**: Ha <img src="https://render.githubusercontent.com/render/math?math=C" /> problémák egy osztálya, akkor az <img src="https://render.githubusercontent.com/render/math?math=A" /> probléma

- **<img src="https://render.githubusercontent.com/render/math?math=C" />-nehéz**, ha minden <img src="https://render.githubusercontent.com/render/math?math=C" />-beli probléma visszavezethető <img src="https://render.githubusercontent.com/render/math?math=A" />-ra

- **<img src="https://render.githubusercontent.com/render/math?math=C" />-teljes**, ha <img src="https://render.githubusercontent.com/render/math?math=A" /> még ráadásul <img src="https://render.githubusercontent.com/render/math?math=C" />-ben is van

##### Polinomidőben verifikálhatóság

Az <img src="https://render.githubusercontent.com/render/math?math=A" /> probléma polinomidőben verifikálható, ha van egy olyan <img src="https://render.githubusercontent.com/render/math?math=R" /> reláció, **inputok**, és **tanúk** között, melyre:

- Ha <img src="https://render.githubusercontent.com/render/math?math=R(I%2C%20T)" /> az <img src="https://render.githubusercontent.com/render/math?math=I" /> inputra és a <img src="https://render.githubusercontent.com/render/math?math=T" /> tanúsítványra, akkor <img src="https://render.githubusercontent.com/render/math?math=%7CT%7C%20%5Cle%20%7CI%7C%5Ec" /> valamilyen <img src="https://render.githubusercontent.com/render/math?math=c" /> konstansra (azaz a tanúk "nem túl hosszúak")

- Ha kapunk egy <img src="https://render.githubusercontent.com/render/math?math=(I%2C%20T)" /> párt, arról determinisztikusan polinomidőben el tudjuk dönteni, hogy <img src="https://render.githubusercontent.com/render/math?math=R(I%2C%20T)" /> fennáll-e, vagy sem (azaz egy tanú könnyen ellenőrizhető)

- Pontosan akkor létezik <img src="https://render.githubusercontent.com/render/math?math=I" />-hez olyan <img src="https://render.githubusercontent.com/render/math?math=T" />, melyre <img src="https://render.githubusercontent.com/render/math?math=R(I%2C%20T)" /> igaz, ha <img src="https://render.githubusercontent.com/render/math?math=I" /> az <img src="https://render.githubusercontent.com/render/math?math=A" />-nak egy "igen" példánya (azaz <img src="https://render.githubusercontent.com/render/math?math=R" /> tényleg egy jó "tanúsítvány-rendszer" az <img src="https://render.githubusercontent.com/render/math?math=A" /> problémához)

> SAT esetében pl. lineáris időben tudjuk ellenőrizni, hogy egy adott értékadás kielégíti-e a CNF-et.

**Egy probléma pontosan akkor van NP-ben, ha polinomidőben verifikálható.**

##### SAT

Cook tétele kimondja, hogy a **SAT egy NP-teljes probléma**.

Variánsok: FORMSAT, 3SAT is NP-teljes (és minden kSAT <img src="https://render.githubusercontent.com/render/math?math=k%20%5Cge%203" />-ra), DE 2SAT P-beli, visszavezethető ugyanis az elérhetőségre.

Horn-átnevezhető formulák kielégítése is polinomidőben eldönthető.

> Horn-formula, ha minden klózban legfeljebb egy pozitív literál, Horn-átnevezhető, ha bizonyos változók komplementálásával Horn-formulává alakítható.

##### NP-teljes gráfelméleti problémák

###### Független csúcshalmaz

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=G" /> irányítatlan gráf, és egy <img src="https://render.githubusercontent.com/render/math?math=K" /> szám

**Output**: Van-e <img src="https://render.githubusercontent.com/render/math?math=G" />-ben <img src="https://render.githubusercontent.com/render/math?math=K" /> darab **független**, azaz páronként nem szomszédos csúcs?

###### Klikk

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=G" /> gráf, és egy <img src="https://render.githubusercontent.com/render/math?math=K" /> szám.

**Output**: Van-e <img src="https://render.githubusercontent.com/render/math?math=G" />-ben <img src="https://render.githubusercontent.com/render/math?math=K" /> darab páronként szomszédos csúcs?

###### Hamilton-út

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=G" /> gráf.

**Output**: Van-e <img src="https://render.githubusercontent.com/render/math?math=G" />-ben Hamilton-út?

##### Halmazelméleti NP-teljes problémák

###### Párosítás

**Input**: Két egyforma méretű halmaz, <img src="https://render.githubusercontent.com/render/math?math=A" />, és <img src="https://render.githubusercontent.com/render/math?math=B" />, és egy <img src="https://render.githubusercontent.com/render/math?math=R%20%5Csubseteq%20A%20%5Ctimes%20B" /> reláció.

**Output**: Van-e olyan <img src="https://render.githubusercontent.com/render/math?math=M%20%5Csubseteq%20R" /> részhalmaza a megengedett pároknak, melyben minden <img src="https://render.githubusercontent.com/render/math?math=A%20%5Ccup%20B" />-beli elem pontosan egyszer van fedve?

> <img src="https://render.githubusercontent.com/render/math?math=A" /> halmaz: lányok, <img src="https://render.githubusercontent.com/render/math?math=B" /> halmaz: fiúk, reláció: ki hajlandó kivel táncolni. Kérdés: Párokba lehet-e osztani mindenkit?

###### Hármasítás

**Input**: Két egyforma méretű halmaz, <img src="https://render.githubusercontent.com/render/math?math=A" />, <img src="https://render.githubusercontent.com/render/math?math=B" />, és <img src="https://render.githubusercontent.com/render/math?math=C" />, és egy <img src="https://render.githubusercontent.com/render/math?math=R%20%5Csubseteq%20A%20%5Ctimes%20B%20%5Ctimes%20C" /> reláció.

**Output**: Van-e olyan <img src="https://render.githubusercontent.com/render/math?math=M%20%5Csubseteq%20R" /> részhalmaza a megengedett pároknak, melyben minden <img src="https://render.githubusercontent.com/render/math?math=A%20%5Ccup%20B%20%5Ccup%20C" />-beli elem pontosan egyszer van fedve?

> Hasonló példa áll, <img src="https://render.githubusercontent.com/render/math?math=C" /> halmaz házak, ahol táncolnak.

###### Pontos lefedés hármasokkal

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=U" /> <img src="https://render.githubusercontent.com/render/math?math=3m" /> elemű halmaz, és háromelemű részhalmazainak egy <img src="https://render.githubusercontent.com/render/math?math=S_1%2C%20...%2C%20S_n%20%5Csubseteq%20U" /> rendszere.

**Output**: Van-e az <img src="https://render.githubusercontent.com/render/math?math=S_i" />-k közt <img src="https://render.githubusercontent.com/render/math?math=m" />, amiknek uniója <img src="https://render.githubusercontent.com/render/math?math=U" />?

###### Halmazfedés

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=U" /> halmaz, részhalmazainak egy <img src="https://render.githubusercontent.com/render/math?math=S_1%2C%20...%2C%20S_n%20%5Csubseteq%20U" /> rendszere, és egy <img src="https://render.githubusercontent.com/render/math?math=K" /> szám.

**Output**: Van-e az <img src="https://render.githubusercontent.com/render/math?math=S_i" />-k közt <img src="https://render.githubusercontent.com/render/math?math=K" /> darab, amiknek uniója <img src="https://render.githubusercontent.com/render/math?math=U" />?

###### Halmazpakolás

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=U" /> halmaz, részhalmazainak egy <img src="https://render.githubusercontent.com/render/math?math=S_1%2C%20...%2C%20S_n%20%5Csubseteq%20U" /> rendszere, és egy <img src="https://render.githubusercontent.com/render/math?math=K" /> szám.

**Output**: Van-e az <img src="https://render.githubusercontent.com/render/math?math=S_i" />-k közt <img src="https://render.githubusercontent.com/render/math?math=K" /> darab páronként diszjunkt?

##### Számelméleti NP-teljes problémák

###### Egész értékű programozás

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=Ax%20%5Cle%20b" /> egyenlőtlenség-rendszer, <img src="https://render.githubusercontent.com/render/math?math=A" />-ban és <img src="https://render.githubusercontent.com/render/math?math=b" />-ben egész számok szerepelnek.

**Output**: Van-e egész koordinátájú <img src="https://render.githubusercontent.com/render/math?math=x" /> vektor, mely kielégíti az egyenlőtlenségeket?

###### Részletösszeg

**Input**: Pozitív egészek egy <img src="https://render.githubusercontent.com/render/math?math=a_1%2C%20...%2C%20a_k" /> sorozata, és egy <img src="https://render.githubusercontent.com/render/math?math=K" /> célszám.

**Output**: Van-e ezeknek olyan részhalmaza, melynek összege épp <img src="https://render.githubusercontent.com/render/math?math=K" />?

###### Partíció

**Input**: Pozitív egészek egy <img src="https://render.githubusercontent.com/render/math?math=a_1%2C%20...%2C%20a_k" /> sorozata.

**Output**: Van-e ezeknek egy olyan részhalmaza, melynek összege épp <img src="https://render.githubusercontent.com/render/math?math=%5Cfrac%7B%5Csum_%7Bi%20%3D%201%7D%5E%7Bk%7D%20a_i%7D%7B2%7D" />?

###### Hátizsák

**Input**: <img src="https://render.githubusercontent.com/render/math?math=i" /> darab tárgy, mindegyiknek egy <img src="https://render.githubusercontent.com/render/math?math=w_i" /> súlya, és egy <img src="https://render.githubusercontent.com/render/math?math=c_i" /> értéke, egy <img src="https://render.githubusercontent.com/render/math?math=W" /> összkapacitás és egy <img src="https://render.githubusercontent.com/render/math?math=C" /> célérték.

**Output**: Van-e a tárgyaknak olyan részhalmaza, melynek összsúlya legfeljebb <img src="https://render.githubusercontent.com/render/math?math=W" />, összértéke pedig legalább <img src="https://render.githubusercontent.com/render/math?math=C" />?

> TODO: erős-, gyenge NP-teljesség kell-e ide?

### 2. A PSPACE osztály. PSPACE-teljes problémák. Logaritmikus tárigényű visszavezetés. NL-teljes problémák.

#### A PSPACE osztály

Determinisztikusan (vagy nemdeterminisztikusan), polinomidőben megoldható problémák osztálya.

- <img src="https://render.githubusercontent.com/render/math?math=SPACE(f(n))" />: Az <img src="https://render.githubusercontent.com/render/math?math=O(f(n))" /> tárban eldönthető problémák osztálya.

- <img src="https://render.githubusercontent.com/render/math?math=NSPACE(f(n))" />: Az <img src="https://render.githubusercontent.com/render/math?math=O(f(n))" /> tárban **nemdeterminisztikusan** eldönthető problémák osztálya.

- <img src="https://render.githubusercontent.com/render/math?math=TIME(f(n))" />: Az <img src="https://render.githubusercontent.com/render/math?math=O(f(n))" /> időben eldönthető problémák osztálya.

- <img src="https://render.githubusercontent.com/render/math?math=NTIME(f(n))" />: Az <img src="https://render.githubusercontent.com/render/math?math=O(f(n))" /> időben **nemdeterminisztikusan** eldönthető problémák osztálya.

PSPACE-beli problémák még **nehezebbek, mint az NP-beliek**.

##### Fontos összefüggés NSPACE és SPACE között

<img src="https://render.githubusercontent.com/render/math?math=NSPACE(f(n))%20%5Csubseteq%20SPACE(f%5E2(n))" />

Ebből következik ez is:

<img src="https://render.githubusercontent.com/render/math?math=PSPACE%20%3D%20NPSPACE" />

Hiszen a kettes hatványtól függetlenül <img src="https://render.githubusercontent.com/render/math?math=f(n)" /> ugyan úgy csak egy **polinom**iális függvény.

> Ennek az összefüggésnek az oka, hogy a tár **újra felhasználható**. Emiatt viszonylag kevés tár is elég sok probléma eldöntésére. Az idő ezzel szemben sokkal problémásabb, nem tudjuk, hogy egy <img src="https://render.githubusercontent.com/render/math?math=f(n)" /> időigényű nemdeterminisztikus algoritmust lehet-e <img src="https://render.githubusercontent.com/render/math?math=2%5E%7BO(f(n))%7D" />-nél gyorsabban szimulálni.

##### Lineáris tárigény

Az előbb említett előny miatt elég sok probléma eldönthető <img src="https://render.githubusercontent.com/render/math?math=O(n)" /> tárban.

Pl. **SAT**, **HAMILTON-ÚT,** és a **3-SZÍNEZÉS** mind eldönthető lineáris tárban. Csak lehetséges tanúkat kell generálni, fontos, hogy egyszerre csak egyet, ezt a tárat használjuk fel újra és újra. Ellenőrizzük a tanút, ha nem jó generáljuk a következőt.

#### _Offline_, vagy _lyukszalagos_ tárigény

Ha az algoritmus az inputot csak olvassa, és az outputot _stream-mód_-ban írja, akkor az input, output regisztereket nem kell beszámolni, csak a working regisztereket.

> A cél ezzel az, mert a korábbiak alapján jó lenne, ha lehetne értelme szublineáris tárigénynek. Márpedig ha pl. az inputot már beszámoljuk, akkor az már legalább lineáris.

#### Az NL-osztály

- <img src="https://render.githubusercontent.com/render/math?math=L%20%3D%20SPACE(logn)" />: Determinisztikusan logaritmikus tárban eldönthető problémák osztálya.

- <img src="https://render.githubusercontent.com/render/math?math=NL%20%3D%20NSPACE(logn)" />: Nemdeterminisztikusan logaritmikus tárban eldönthető problémák osztálya.

Immermann-Szelepcsényi tétel szerint: <img src="https://render.githubusercontent.com/render/math?math=NL%20%3D%20coNL" />

##### Mit nem szabad, hogy legyen esély NL-beli algoritmust készíteni?

- Az **inputot írni**.

- <img src="https://render.githubusercontent.com/render/math?math=%5CTheta(n)" /> méretű bináris tömböt felvenni.

##### Mit szabad?

- Olyan **változót létrehozni**, amibe <img src="https://render.githubusercontent.com/render/math?math=0" /> és <img src="https://render.githubusercontent.com/render/math?math=n" /> közti számokat írunk, hiszen ezek <img src="https://render.githubusercontent.com/render/math?math=logn" /> tárat igényelnek.

- Nem csak <img src="https://render.githubusercontent.com/render/math?math=n" />-ig ér számolni, hanem bármilyen **fix fokszámú polinomig**. Pl. ha <img src="https://render.githubusercontent.com/render/math?math=n%5E3" />-ig számolunk, az is elfér <img src="https://render.githubusercontent.com/render/math?math=log%5E3%20%3D%203%20*%20logn" /> biten, tehát <img src="https://render.githubusercontent.com/render/math?math=O(logn)" /> a tárkorlátja.

- Az **input valamelyik elemére rámutatni** egy pointerrel, hiszen lényegében ez is egy <img src="https://render.githubusercontent.com/render/math?math=0" />-tól <img src="https://render.githubusercontent.com/render/math?math=n" />-ig értékeket felvevő változó.

##### Elérhetőség

**Determinisztikusan** Savitch tétele szerint az ELÉRHETŐSÉG eldönthető <img src="https://render.githubusercontent.com/render/math?math=O(log%5E2n)" /> tárban. Ennek oka a rekurzió, hiszen egy példányunk <img src="https://render.githubusercontent.com/render/math?math=O(logn)" /> táras, de ebből egyszerre akár <img src="https://render.githubusercontent.com/render/math?math=logn" /> darab is lehet a memóriában.

**Nemdeterminisztikusan** bele férünk a logtárba. Ekkor "nemdeterminisztikusan bolyongunk" a gráfban, és ha <img src="https://render.githubusercontent.com/render/math?math=N" /> lépésben elértünk a csúcsig, akkor `true` amúgy `false`. Tehát minden iterációban átlépünk nemdeterminisztikusan minden szomszédra, ha megtaláltuk a cél csúcsot, `true`, ha nem tudunk már tovább lépni, vagy lefutott mind az <img src="https://render.githubusercontent.com/render/math?math=N" /> iteráció, akkor `false`.

Ezek alapján tehát:

<img src="https://render.githubusercontent.com/render/math?math=%5Ctext%7BEL%C3%89RHET%C5%90S%C3%89G%7D%20%5Cin%20%5Ctextbf%7BNL%7D" />

![ ](../img/bonya_osztalyok.png)

#### Logtáras visszavezetés

<img src="https://render.githubusercontent.com/render/math?math=P" />-n belül ugye a polinomidejű visszavezetésnek nincs értelme. Hiszen ekkor az inputkonverziót végző függvényben meg tudjuk oldani a problémát, és csak visszaadni egy ismerten `true` vagy `false` inputot.

##### Definíció

Legyenek <img src="https://render.githubusercontent.com/render/math?math=A" /> és <img src="https://render.githubusercontent.com/render/math?math=B" /> eldöntési problémák. Ha <img src="https://render.githubusercontent.com/render/math?math=f" /> egy olyan függvény, mely

- <img src="https://render.githubusercontent.com/render/math?math=A" /> inputjaiból <img src="https://render.githubusercontent.com/render/math?math=B" /> inputjait készíti,

- választartó módon: <img src="https://render.githubusercontent.com/render/math?math=A" /> "igen" példányiból <img src="https://render.githubusercontent.com/render/math?math=B" /> "igen" példányait, "nem" példányaiból pedig "nem" példányt,

- és logaritmikus tárban kiszámítható,

akkor <img src="https://render.githubusercontent.com/render/math?math=f" /> egy logtáras visszavezetés <img src="https://render.githubusercontent.com/render/math?math=A" />-ról <img src="https://render.githubusercontent.com/render/math?math=B" />-re. Ha <img src="https://render.githubusercontent.com/render/math?math=A" /> és <img src="https://render.githubusercontent.com/render/math?math=B" /> közt létezik ilyen, akkor azt mondjuk, hogy <img src="https://render.githubusercontent.com/render/math?math=A" /> logtárban visszavezethető <img src="https://render.githubusercontent.com/render/math?math=B" />-re, jelben <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cle_L%20B" />.

> <img src="https://render.githubusercontent.com/render/math?math=f" /> biztosan lyukszalagos, hiszen szublineárisnak kell lennie.

##### Tulajdonságok

A logaritmikus tárigényű algoritmusok polinom időben megállnak, hiszen <img src="https://render.githubusercontent.com/render/math?math=O(logn)" /> tárat <img src="https://render.githubusercontent.com/render/math?math=2%5E%7BO(logn)%7D" /> féleképp lehet teleírni, minden pillanatban a program <img src="https://render.githubusercontent.com/render/math?math=K" /> darab konstans utasítás egyikét hajtja éppen végre, így összesen <img src="https://render.githubusercontent.com/render/math?math=K%20*%202%5E%7BO(logn)%7D" />-féle különböző konfigurációja lehet, ami polinom.

Ebből következik: <img src="https://render.githubusercontent.com/render/math?math=%5Ctext%7BHa%20%7D%20A%20%5Cle_L%20B%20%5Ctext%7B%2C%20akkor%7D%20A%20%5Cle_P%20B" />

> Azaz a logtáras visszavezetés formailag "gyengébb".

Valójában nem tudjuk, hogy ténylegesen gyengébb-e ez a visszavezetés, de azt tudjuk, hogy akkor lesz gyengébb, ha <img src="https://render.githubusercontent.com/render/math?math=L%20%5Cne%20P" />.

<img src="https://render.githubusercontent.com/render/math?math=L%20%3D%20P" /> pontosan akkor teljesül, ha <img src="https://render.githubusercontent.com/render/math?math=%5Cle_L%20~%20%3D%20~%20%5Cle_P" />

Ha <img src="https://render.githubusercontent.com/render/math?math=f" /> és <img src="https://render.githubusercontent.com/render/math?math=g" /> logtáras függvények, akkor kompozíciójuk is az. Ez azért jó, mert akkor itt is be lehet vetni azt a trükköt, amit a polinomidejű visszavezetésnél, azaz a <img src="https://render.githubusercontent.com/render/math?math=C" />-nehézség bizonyításához elég egy már ismert <img src="https://render.githubusercontent.com/render/math?math=C" />-nehéz problémát visszavezetni az adott problémára. Hiszen ekkor tranzitívan minden <img src="https://render.githubusercontent.com/render/math?math=C" />-beli probléma visszavezethető lesz az aktuális problémára is.

#### NL-teljes problémák

Legyen <img src="https://render.githubusercontent.com/render/math?math=L%20%5Csub%20C%20%5Csubseteq%20P" /> problémák egy osztálya. Azt mondjuk, hogy az <img src="https://render.githubusercontent.com/render/math?math=A" /> probléma <img src="https://render.githubusercontent.com/render/math?math=C" />-nehéz, ha <img src="https://render.githubusercontent.com/render/math?math=C" /> minden eleme **logtárban** visszavezethető <img src="https://render.githubusercontent.com/render/math?math=A" />-ra.

Ha ezen kívül <img src="https://render.githubusercontent.com/render/math?math=A" /> még ráadásul <img src="https://render.githubusercontent.com/render/math?math=C" />-beli is, akkor <img src="https://render.githubusercontent.com/render/math?math=A" /> egy <img src="https://render.githubusercontent.com/render/math?math=C" />-teljes probléma.

> Szóval ugyan az, mint <img src="https://render.githubusercontent.com/render/math?math=P" />-n kívül, csak logtárban, mivel <img src="https://render.githubusercontent.com/render/math?math=P" />-n belül a polinomidejű visszavezetésnek nincs értelme.

##### P-teljes problémák

- Input egy **változómentes** itéletkalkulus-beli formula, kiértékelhatő-e?

- HÁLÓZAT-KIÉRTÉKELÉS

##### NL-teljes problémák

- **ELÉRHETŐSÉG**

- **ELÉRHETŐSÉG** úgy, hogy az input irányított, **körmentes** gráf

- **ELÉRHETETLENSÉG** (mivel ez az ELÉRHETŐSÉG komplementere, igy <img src="https://render.githubusercontent.com/render/math?math=coNL" />-teljes, így <img src="https://render.githubusercontent.com/render/math?math=NL" />-teljes, hiszen <img src="https://render.githubusercontent.com/render/math?math=NL%20%3D%20coNL" /> az Immermann-Szelepcsényi tétel szerint)

- **2SAT** (, és annak a komplementere, megintcsak az Immermann-Szelepcsényi tétel miatt)

#### PSPACE-teljes problémák

##### QSAT

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=%5Cexists%20x_1%20%5Cforall%20x_2%20%5Cexists%20x_3%20...%20%5Cforall%20x_%7B2m%7D%5Cphi" /> alakú **kvantifikált ítéletlogikai** formula, melynek magja, a <img src="https://render.githubusercontent.com/render/math?math=%5Cphi" /> konjunktív normálformájú, **kvantormentes** formula, melyben csak az <img src="https://render.githubusercontent.com/render/math?math=x_1%2C%20...%2C%20x_%7B2m%7D" /> változók fordulnak elő.

**Output**: Igaz-e <img src="https://render.githubusercontent.com/render/math?math=%5Cphi" />?

> Ez nem első rendű logika, az <img src="https://render.githubusercontent.com/render/math?math=x_i" /> változók csak igaz / hamis értékeket vehetnek fel.

A QSAT egy **PSPACE-teljes** probléma.

Egy QSAT-ot megoldó rekurzív algoritmus rekurziós fája:

![ ](../img/qsat_alg.png)

Tárigénye <img src="https://render.githubusercontent.com/render/math?math=O(n%5E2)" />, mert a rekurziókor lemásoljuk az inputot, ami <img src="https://render.githubusercontent.com/render/math?math=O(n)" /> méretű, és a mélység <img src="https://render.githubusercontent.com/render/math?math=O(n)" />

###### QSAT, mint kétszemélyes, zéró összegű játék

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=%5Cexists%20x_1%20%5Cforall%20x_2%20%5Cexists%20x_3%20...%20%5Cforall%20x_%7B2m%7D%5Cphi" /> alakú **kvantifikált ítéletlogikai** formula, melynek magja, a <img src="https://render.githubusercontent.com/render/math?math=%5Cphi" /> konjunktív normálformájú, **kvantormentes** formula, melyben csak az <img src="https://render.githubusercontent.com/render/math?math=x_1%2C%20...%2C%20x_%7B2m%7D" /> változók fordulnak elő.

**Output**: Az első játékosnak van-e nyerő stratégiája a következő játékban?

- A játékosok sorban értéket adnak a változóknak, előbb az első játékos <img src="https://render.githubusercontent.com/render/math?math=x_1" />-nek, majd a második <img src="https://render.githubusercontent.com/render/math?math=x_2" />-nek, megint az első stb., végül a második <img src="https://render.githubusercontent.com/render/math?math=x_%7B2m%7D" />-nek.

- Ha a formula értéke igaz lesz, az első játékos nyert, ha hamis, a második.

##### FÖLDRAJZI JÁTÉK

**Input**: Egy <img src="https://render.githubusercontent.com/render/math?math=G%20%3D%20(V%2C%20E)" /> irányított gráf. és egy kijelölt "kezdő" csúcsa.

**Output**: Az első játékosnak van-e nyerő stratégiája a következő játékban?

- Először az első játékos kezd, lerakja az egyetlej bábuját a gráf kezdőcsúcsára.

- Ezután a második játékos lép, majd az első, stb., felváltva, mindketten a bábut az aktuális pozíciójából egy olyan csúcsba kell húzzák, ami egy lépésben elérhető, és ahol még nem volt a játék során. Aki először nem tud lépni, vesztett.

##### További PSPACE-teljes problémák

- Adott egy <img src="https://render.githubusercontent.com/render/math?math=M" /> determinisztikus RAM program, és egy <img src="https://render.githubusercontent.com/render/math?math=I" /> inputja. Igaz-e, hogy <img src="https://render.githubusercontent.com/render/math?math=M" /> elfogadja <img src="https://render.githubusercontent.com/render/math?math=I" />-t, méghozzá <img src="https://render.githubusercontent.com/render/math?math=O(n)" /> tárat használva?

- Adott két reguláris kifejezés. Igaz-e hogy ugyan azokra a szavakra illeszkednek?

- Adott két nemdeterminisztikus automata. Ekvivalensek-e?

- <img src="https://render.githubusercontent.com/render/math?math=n%20%5Ctimes%20n" />-es SOKOBAN

- <img src="https://render.githubusercontent.com/render/math?math=n%20%5Ctimes%20n" />-es RUSH HOUR
## Formális Nyelvek

### 1. Véges automata és változatai, a felismert nyelv definíciója. A reguláris nyelvtanok, a véges automaták, és a reguláris kifejezések ekvivalenciája. Reguláris nyelvekre vonatkozó pumpáló lemma, alkalmazása és következményei.

#### Véges automata

Az <img src="https://render.githubusercontent.com/render/math?math=M%20%3D%20(Q%2C%20%5CSigma%2C%20%5Cdelta%2C%20q_0%2C%20F)" /> rendszert **determinisztikus automatának** nevezzük, ahol:

- <img src="https://render.githubusercontent.com/render/math?math=Q" /> egy nem üres, véges halmaz, az **állapotok halmaza**

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> egy ábécé, au **input ábécé**

- <img src="https://render.githubusercontent.com/render/math?math=q_0%20%5Cin%20Q" /> a **kezdő állapot**

- <img src="https://render.githubusercontent.com/render/math?math=F%20%5Csubseteq%20Q" /> a **végállapotok halmaza**

- <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta%3A%20Q%20%5Ctimes%20%5CSigma%20%5Cto%20Q" /> egy leképezés, az **átmenetfüggvény**

Példa:

- <img src="https://render.githubusercontent.com/render/math?math=Q%20%3D%20%5C%7B%20~%20q_0%2C%20q_1%2C%20q_2%20~%20%5C%7D" />

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%3D%20%5C%7B%20~%20a%2C%20b%20~%20%5C%7D" />

- <img src="https://render.githubusercontent.com/render/math?math=F%20%3D%20%5C%7B%20~%20q_0%20~%5C%7D" />

- <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q_0%2C%20a)%20%3D%20q_1" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q_1%2C%20a)%20%3D%20q_2" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q_2%2C%20a)%20%3D%20q_0" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q_0%2C%20b)%20%3D%20q_0" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q_1%2C%20b)%20%3D%20q_1" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q_2%2C%20b)%20%3D%20q_2" />

##### Automata megadása irányított gráfként

Gráf csúcsai az automata állapotai

Ha <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q%2C%20a)%20%3D%20p" />, akkor a <img src="https://render.githubusercontent.com/render/math?math=q" /> csúcsból egy élet irányítunk a <img src="https://render.githubusercontent.com/render/math?math=p" /> csúcsba, és az élet ellátjuk az <img src="https://render.githubusercontent.com/render/math?math=a" /> címkével

```mermaid
graph LR;
    q((q)) --a--> p((p))
```

> Itt az automata a <img src="https://render.githubusercontent.com/render/math?math=q" /> állapotból az <img src="https://render.githubusercontent.com/render/math?math=a" /> input szimbólum hatására átmegy a <img src="https://render.githubusercontent.com/render/math?math=p" /> állapotba.

A korább példa automata megadása gráffal:

```mermaid
graph LR;
    q0((q0)) --a--> q1((q1));
    q0((q0)) --b--> q0((q0));
    q1((q1)) --a--> q2((q2));
    q1((q1)) --b--> q1((q1));
    q2((q2)) --a--> q0((q0));
    q2((q2)) --b--> q2((q2));

    style q0 stroke-width:3px
```

> A <img src="https://render.githubusercontent.com/render/math?math=q_0" /> állapot jelen példában a végállapot is, amit a vastagított szél jelez.

##### Automata megadása táblázatként

Első sorban a kezdőállapot, végállapotokat meg kell jelölni (itt most csillag).

A korább példa automata megadása táblázattal:

| <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta" /> | <img src="https://render.githubusercontent.com/render/math?math=a" />   | <img src="https://render.githubusercontent.com/render/math?math=b" />   |
|:--------:|:-----:|:-----:|
| \* <img src="https://render.githubusercontent.com/render/math?math=q_0" /> | <img src="https://render.githubusercontent.com/render/math?math=q_1" /> | <img src="https://render.githubusercontent.com/render/math?math=q_0" /> |
| <img src="https://render.githubusercontent.com/render/math?math=q_1" />    | <img src="https://render.githubusercontent.com/render/math?math=q_2" /> | <img src="https://render.githubusercontent.com/render/math?math=q_1" /> |
| <img src="https://render.githubusercontent.com/render/math?math=q_2" />    | <img src="https://render.githubusercontent.com/render/math?math=q_0" /> | <img src="https://render.githubusercontent.com/render/math?math=q_2" /> |

> Csillag jelzi, hogy az adott sor állapota végállapot.

##### Automata átmenetei

<img src="https://render.githubusercontent.com/render/math?math=M" /> **konfigurációinak halmaza**: <img src="https://render.githubusercontent.com/render/math?math=C%20%3D%20Q%20%5Ctimes%20%5CSigma%5E*" />

A <img src="https://render.githubusercontent.com/render/math?math=(q%2C%20a_1...a_n)" /> **konfiguráció** azt jelenti, hogy <img src="https://render.githubusercontent.com/render/math?math=M" /> a <img src="https://render.githubusercontent.com/render/math?math=q" /> állapotban van ás az <img src="https://render.githubusercontent.com/render/math?math=a_1...a_n" /> szót kapja inputként.

###### Átmeneti reláció

<img src="https://render.githubusercontent.com/render/math?math=(q%2C%20w)%2C%20(q'%2C%20w')%20%5Cin%20C" /> esetén <img src="https://render.githubusercontent.com/render/math?math=(q%2C%20w)%20%5Cvdash_M%20(q'%2C%20w')" />, ha <img src="https://render.githubusercontent.com/render/math?math=w%20%3D%20aw'" />, valamely <img src="https://render.githubusercontent.com/render/math?math=a%20%5Cin%20%5CSigma" />-ra, és <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q%2C%20a)%20%3D%20q'" />.

> Azaz aminkor az automata átmegy <img src="https://render.githubusercontent.com/render/math?math=q" />-ból <img src="https://render.githubusercontent.com/render/math?math=q'" />-be, akkor az ehhez "felhasznált" szimbólumot leveszi az input szó elejéről. Pl. itt <img src="https://render.githubusercontent.com/render/math?math=a" /> hatására ment, és <img src="https://render.githubusercontent.com/render/math?math=w%20%3D%20aw'" />, így az átmenet után az input szó már csak <img src="https://render.githubusercontent.com/render/math?math=w'" /> az <img src="https://render.githubusercontent.com/render/math?math=a" /> nélkül. Mondhatni, hogy az <img src="https://render.githubusercontent.com/render/math?math=a" />-t felhasználta az átmenethez.

####### Átmeneti reláció fajtái

- <img src="https://render.githubusercontent.com/render/math?math=(q%2C%20w)%20%5Cvdash_M%20(q'%2C%20w')" />: Egy lépés

- <img src="https://render.githubusercontent.com/render/math?math=(q%2C%20w)%20%5Cvdash%5En_M%20(q'%2C%20w')%2C%20n%20%5Cge%200" />: <img src="https://render.githubusercontent.com/render/math?math=n" /> lépés

- <img src="https://render.githubusercontent.com/render/math?math=(q%2C%20w)%20%5Cvdash%5E%2B_M%20(q'%2C%20w')" />: Legalább egy lépés

- <img src="https://render.githubusercontent.com/render/math?math=(q%2C%20w)%20%5Cvdash%5E*_M%20(q'%2C%20w')" />: Valamennyi (esetleg 0) lépés

> Az <img src="https://render.githubusercontent.com/render/math?math=M" /> jelölés egy automatát azonosít, elhagyható, ha éppen csak 1 automatáról beszélünk, mert ilyenkor egyértelmű

> \*, és + itt is, és mindenhol ebben a tárgyban úgy működik, mint megszokott regexeknél

##### Felismert nyelv

Az <img src="https://render.githubusercontent.com/render/math?math=M%20%3D%20(Q%2C%20%5CSigma%2C%20%5Cdelta%2C%20q_0%2C%20F)" /> automata által felismert nyelven az <img src="https://render.githubusercontent.com/render/math?math=L(M)%20%3D%20%5C%7B%20~%20w%20%5Cin%20%5CSigma%5E*%20~%20%7C%20~%20(q_0%2C%20w)%20%5Cvdash%5E*_M%20(q%2C%20%5Cepsilon)%20~%20%5Ctext%7B%C3%A9s%7D%20~%20q%20%5Cin%20F%20~%20%5C%7D" /> nyelvet értjük.

> Azaz <img src="https://render.githubusercontent.com/render/math?math=q_0" />-ból <img src="https://render.githubusercontent.com/render/math?math=w" /> hatására valamelyik <img src="https://render.githubusercontent.com/render/math?math=q%20%5Cin%20F" /> végállapotba jutunk

> <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" /> az üres szó

##### Nemdeterminisztikus automata

Az <img src="https://render.githubusercontent.com/render/math?math=M%20%3D%20(Q%2C%20%5CSigma%2C%20%5Cdelta%2C%20q_0%2C%20F)" /> rendszert **nemdeterminisztikus automatának** nevezzük, ahol:

- <img src="https://render.githubusercontent.com/render/math?math=Q" /> egy nem üres, véges halmaz, az **állapotok halmaza**

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> egy ábécé, az **input ábécé**

- <img src="https://render.githubusercontent.com/render/math?math=q_0%20%5Cin%20Q" /> a **kezdő állapot**

- <img src="https://render.githubusercontent.com/render/math?math=F%20%5Csubseteq%20Q" /> a **végállapotok halmaza**

- <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta%3A%20Q%20%5Ctimes%20%5CSigma%20%5Cto%20%5Cmathcal%7BP%7D(Q)" /> egy leképezés, az **átmenetfüggvény\***

> Azaz ugyan az, mint a determinisztikus, csak egy input szimbólum hatására egy állapotból többe is átmehet.

A determinisztikus automata ezen általánosítása (hiszen ez egy általánosítás, a determinisztikus automata is lényehében olyan nemdeterminisztikus ami mindig állapotoknak egy egyelemű halmazába tér át) **nem növeli meg a felismerő kapacitást**, tehát egy nyelv akkor és csak akkor ismerhető fel nemdeterminisztikus automatával, ha felismerhető determinisztikus automatával.

> Ezt "hatvány halmaz módszerrel" lehet bebizonyítani, meg kell nézni, hogy <img src="https://render.githubusercontent.com/render/math?math=a" /> hatására milyen állapotokba tud kerülni a nemdeterminisztikus automata, és azonkah az uniója lesz egy állapot. Ez a "determinizálás", aminek a során az állapotok száma nagyban megnőhet (akár exponenciálisan).

###### Átmeneti reláció

<img src="https://render.githubusercontent.com/render/math?math=(q%2C%20w)%2C%20(q'%2C%20w')%20%5Cin%20C" /> esetén <img src="https://render.githubusercontent.com/render/math?math=(q%2C%20w)%20%5Cvdash_M%20(q'%2C%20w')" />, ha <img src="https://render.githubusercontent.com/render/math?math=w%20%3D%20aw'" />, valamely <img src="https://render.githubusercontent.com/render/math?math=a%20%5Cin%20%5CSigma" />-ra, és <img src="https://render.githubusercontent.com/render/math?math=q'%20%5Cin%20%5Cdelta(q%2C%20a)" />.

###### Felismert nyelv

Az <img src="https://render.githubusercontent.com/render/math?math=M%20%3D%20(Q%2C%20%5CSigma%2C%20%5Cdelta%2C%20q_0%2C%20F)" /> (nemdeterminisztikus) automata által felismert nyelven az <img src="https://render.githubusercontent.com/render/math?math=L(M)%20%3D%20%5C%7B%20~%20w%20%5Cin%20%5CSigma%5E*%20~%20%7C%20~%20(q_0%2C%20w)%20%5Cvdash%5E*_M%20(q%2C%20%5Cepsilon)%20~%20%5Ctext%7Bvalamely%7D%20~%20q%20%5Cin%20F%20%5Ctext%7B-re%7D%20~%20%5C%7D" /> nyelvet értjük.

> Azaz <img src="https://render.githubusercontent.com/render/math?math=q_0" />-ból a <img src="https://render.githubusercontent.com/render/math?math=w" /> hatására elérhető valamely <img src="https://render.githubusercontent.com/render/math?math=q%20%5Cin%20F" /> végállapot. DE! Nem baj, ha elérhetően nem-végállapotok is.

###### Teljesen definiált automata

Akkor teljesen definiált egy automat, ha minden szót végig tud olvasni.

Azaz nem tud pl. egy <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q%2C%20a)%20%3D%20%5Cemptyset" /> átmenet miatt elakadni.

Azaz akkor teljesen definiált, ha minden <img src="https://render.githubusercontent.com/render/math?math=q%20%5Cin%20Q" /> és <img src="https://render.githubusercontent.com/render/math?math=a%20%5Cin%20%5CSigma" /> esetén <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q%2C%20a)" /> **legalább** egy elemű.

Determinisztikus automaták teljesen definiáltak, hiszen pontosan egy állapotba léphetünk tovább.

Nemdeterminisztikus automaták pedig teljesen definiálhatóvá tehetőek "csapda" állapot bevezetésével, anélkül, hogy a felismert nyelv megváltozna.

- Felveszünk egy <img src="https://render.githubusercontent.com/render/math?math=q_c" /> állapotot (ez a "csapda") állapot.

- <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q%2C%20a)%20%3D%20%5Cemptyset" /> esetén legyen <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q%2C%20a)%20%3D%20%5C%7B~%20q_c%20~%5C%7D" />

- Legyen <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta(q_c%2C%20a)%20%3D%20%5C%7B~%20q_c%20~%5C%7D" /> minden <img src="https://render.githubusercontent.com/render/math?math=a%20%5Cin%20%5CSigma" />-ra.

> A 3. pont az, ami miatt ez egy "csapda", nem lehet már ebből az állapotból kijönni.

##### Nemdeterminisztikus <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />-automata

Tartalmaz <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />-átmeneteket.

Az <img src="https://render.githubusercontent.com/render/math?math=M%20%3D%20(Q%2C%20%5CSigma%2C%20%5Cdelta%2C%20q_0%2C%20F)" /> rendszert **nemdeterminisztikus <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />-automatának** nevezzük, ahol:

- <img src="https://render.githubusercontent.com/render/math?math=Q" /> egy nem üres, véges halmaz, az **állapotok halmaza**

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> egy ábécé, az **input ábécé**

- <img src="https://render.githubusercontent.com/render/math?math=q_0%20%5Cin%20Q" /> a **kezdő állapot**

- <img src="https://render.githubusercontent.com/render/math?math=F%20%5Csubseteq%20Q" /> a **végállapotok halmaza**

- <img src="https://render.githubusercontent.com/render/math?math=%5Cdelta%3A%20Q%20%5Ctimes%20(%5CSigma%20%5Ccup%20%5C%7B%20~%20%5Cepsilon%20~%20%5C%7D)%20%5Cto%20%5Cmathcal%7BP%7D(Q)" /> egy leképezés, az **átmenetfüggvény**

> Azaz ugyan olyan, mint a nemdeterminisztikus, csak lehet olyan átmenete, ami "nem fogyasztja" az inputot. Ez az <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />-átmenet.

**Ez sem bővíti a felismerő kapacitást**, egy nyelv akkor és csak akkor ismerhető fel nemdeterminisztikus <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />-átmenetes automatával, ha felismerhető nemdeterminisztikus automatával. <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" /> automata <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />-mentesítéssel átalakítható nemdeterminisztikus automatává, ekkor az automaza a <img src="https://render.githubusercontent.com/render/math?math=q" /> állapotból az <img src="https://render.githubusercontent.com/render/math?math=a" /> hatására azon állapotokba megy át, amelyekre <img src="https://render.githubusercontent.com/render/math?math=M" /> valamennyi (akár 0) <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />-átmenettel, majd egy <img src="https://render.githubusercontent.com/render/math?math=a" />-átmenettel jut el, továbbá az automata végállapotai azon az állapotok, amikből valamennyi (akár 0) <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />-átmenettel egy <img src="https://render.githubusercontent.com/render/math?math=F" />-beli állapotba jut.

###### Átmeneti reláció

<img src="https://render.githubusercontent.com/render/math?math=(q%2C%20w)%2C%20(q'%2C%20w')%20%5Cin%20C" /> esetén <img src="https://render.githubusercontent.com/render/math?math=(q%2C%20w)%20%5Cvdash_M%20(q'%2C%20w')" />, ha <img src="https://render.githubusercontent.com/render/math?math=w%20%3D%20aw'" />, valamely <img src="https://render.githubusercontent.com/render/math?math=a%20%5Cin%20(%5CSigma%20%5Ccup%20%5C%7B%20~%20%5Cepsilon%20~%20%5C%7D)" />-ra, és <img src="https://render.githubusercontent.com/render/math?math=q'%20%5Cin%20%5Cdelta(q%2C%20a)" />.

> Ha <img src="https://render.githubusercontent.com/render/math?math=a%20%3D%20%5Cepsilon" />, akkor éppen <img src="https://render.githubusercontent.com/render/math?math=w%20%3D%20w'" />

###### Felismert nyelv

Felismert nyelv definíciója ugyan az, mint a sima nemdeterminisztikus esetben.

#### Ekvivalencia tétel

Tetszőleges <img src="https://render.githubusercontent.com/render/math?math=L%20%5Csubseteq%20%5CSigma%5E*" /> nyelv esetén a következő három állítás ekvivalens:

1. <img src="https://render.githubusercontent.com/render/math?math=L" /> reguláris (generálható reguláris nyelvtannal).

2. <img src="https://render.githubusercontent.com/render/math?math=L" /> felismerhető automatával.

3. <img src="https://render.githubusercontent.com/render/math?math=L" /> reprezentálható reguláris kifejezéssel.

Ezt külön három párra lehet belátni.

##### \* Reguláris nyelvtan

Egy <img src="https://render.githubusercontent.com/render/math?math=G%20%3D%20(N%2C%20%5CSigma%2C%20P%2C%20S)" /> nyelvtan reguláris (vagy jobblineáris), ja <img src="https://render.githubusercontent.com/render/math?math=P" />-ben minden szabály <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20xB" /> vagy <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20x" /> alakú.

Egy <img src="https://render.githubusercontent.com/render/math?math=L" /> nyelvet reguláris nyelvnek hívunk, ha van olyan <img src="https://render.githubusercontent.com/render/math?math=G" /> reguláris nyelvtan, melyre <img src="https://render.githubusercontent.com/render/math?math=L%20%3D%20L(G)" /> (azaz őt generálja).

Az összes reguláris nyelvek halmazát <img src="https://render.githubusercontent.com/render/math?math=REG" />-el jelöljük.

<img src="https://render.githubusercontent.com/render/math?math=REG%20%5Csubset%20CF" />

> Azaz vannak olyan környezetfüggetlen nyelvek, amik nem regulárisak.

##### \* Reguláris kifejezések

Egy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> ábécé feletti reguláris kifejezések halmaza a <img src="https://render.githubusercontent.com/render/math?math=(%5CSigma%20%5Ccup%20%5C%7B~%20%5Cemptyset%2C%20%5Cepsilon%2C%20(%2C%20)%2C%20%2B%2C%20*%20~%5C%7D)%5E*" /> halmaz legszűkebb olyan <img src="https://render.githubusercontent.com/render/math?math=U" /> részhalmaza, amelyre az alábbi feltételek teljesülnek:

1. Az <img src="https://render.githubusercontent.com/render/math?math=%5Cemptyset" /> szimbólum eleme <img src="https://render.githubusercontent.com/render/math?math=U" />-nak

2. Az <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" /> szimbólum eleme <img src="https://render.githubusercontent.com/render/math?math=U" />-nak

3. Minden <img src="https://render.githubusercontent.com/render/math?math=a%20%5Cin%20%5CSigma" />-ra az <img src="https://render.githubusercontent.com/render/math?math=a" /> szimbólum eleme <img src="https://render.githubusercontent.com/render/math?math=U" />-nak

4. Ha <img src="https://render.githubusercontent.com/render/math?math=R_1%2C%20R_2%20%5Cin%20U" />, akkor <img src="https://render.githubusercontent.com/render/math?math=(R_1)%20%2B%20(R_2)%2C%20(R_1)(R_2)" /> és <img src="https://render.githubusercontent.com/render/math?math=(R_1)%5E*" /> is elemei <img src="https://render.githubusercontent.com/render/math?math=U" />-nak.

> <img src="https://render.githubusercontent.com/render/math?math=U" />-ban tehár maguk a kifejezések vannak.

Az <img src="https://render.githubusercontent.com/render/math?math=R" /> reguláris kifejezés által meghatározott (reprezentált) nyelvet <img src="https://render.githubusercontent.com/render/math?math=%7CR%7C" />-el jelöljük, és a következőképp definiáljuk:

- Ha <img src="https://render.githubusercontent.com/render/math?math=R%20%3D%20%5Cemptyset" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%7CR%7C%20%3D%20%5Cemptyset" /> (üres nyelv)

- Ha <img src="https://render.githubusercontent.com/render/math?math=R%20%3D%20%5Cepsilon" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%7CR%7C%20%3D%20%5C%7B~%20%5Cepsilon%20~%5C%7D" />

- Ha <img src="https://render.githubusercontent.com/render/math?math=R%20%3D%20a" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%7CR%7C%20%3D%20%5C%7B~%20a%20~%5C%7D" />

- Ha:
  
  - <img src="https://render.githubusercontent.com/render/math?math=R%20%3D%20(R_1)%2B(R_2)" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%7CR%7C%20%3D%20%7CR_1%7C%20%5Ccup%20%7CR_2%7C" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=R%20%3D%20(R_1)(R_2)" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%7CR%7C%20%3D%20%7CR_1%7C%7CR_2%7C" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=R%20%3D%20(R_1)%5E*" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%7CR%7C%20%3D%20%7CR_1%7C%5E*" />

##### Reprezentálható nyelvek regulárisak

> <img src="https://render.githubusercontent.com/render/math?math=3%20%5Cto%201" /> az ekvivalencia tételben.

Ha <img src="https://render.githubusercontent.com/render/math?math=L%20%5Csubseteq%20%5CSigma%5E*" /> nyelv reprezentálható reguláris kifejezéssel, akkor generálható reguláris nyelvtannal.

Ez <img src="https://render.githubusercontent.com/render/math?math=R" /> struktúrája szerinti indukcióval belátható.

##### Reguláris nyelvek felismerhetők automatával

> <img src="https://render.githubusercontent.com/render/math?math=1%20%5Cto%202" /> az ekvikalencia tételben.

Ha <img src="https://render.githubusercontent.com/render/math?math=L%20%5Csubseteq%20%5CSigma%5E*" /> nyelv reguláris, akkor felismerhető automatával.

Ennek bizonyítását ez a két lemma képezi, ezekkel fel tudunk írni egy automatát a nyelvtanból:

- Minden <img src="https://render.githubusercontent.com/render/math?math=G%20%3D%20(N%2C%20%5CSigma%2C%20P%2C%20S)" /> reguláris nyelvtanhoz megadható vele ekvivalens <img src="https://render.githubusercontent.com/render/math?math=G'%20%3D%20(N'%2C%20%5CSigma%2C%20P'%2C%20S)" /> reguláris nyelvtan, úgy, hogy <img src="https://render.githubusercontent.com/render/math?math=P'" />-ben minden szabály <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20B%2C%20A%20%5Cto%20aB" />, vagy <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20%5Cepsilon" /> alakú, ahol <img src="https://render.githubusercontent.com/render/math?math=A%2C%20B%20%5Cin%20N" /> és <img src="https://render.githubusercontent.com/render/math?math=a%20%5Cin%20%5CSigma" />.
  
  > Ez az átalakítás EZ, csak láncolva új szabályokat kell felvenni, pl. <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20bbB" /> helyett <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20bA_1%2C%20A_1%20%5Cto%20bB" />

- Minden olyan <img src="https://render.githubusercontent.com/render/math?math=G%20%3D%20(N%2C%20%5CSigma%2C%20P%2C%20S)" /> reguláris nyelvtanhoz, melynek csak <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20B%2C%20A%20%5Cto%20aB" /> vagy <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20%5Cepsilon" /> alakú szabályai vannak, megadható olyan <img src="https://render.githubusercontent.com/render/math?math=M%20%3D%20(Q%2C%20%5CSigma%2C%20%5Cdelta%2C%20q_0%2C%20F)" /> nemdeterminisztikus <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />-automata, amelyre <img src="https://render.githubusercontent.com/render/math?math=L(M)%20%3D%20L(G)" />.

> Ez is EZ, hiszen az <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20aB" /> jellegű szabályok könnyen felírjatóak automataként, <img src="https://render.githubusercontent.com/render/math?math=A" />-ból megy <img src="https://render.githubusercontent.com/render/math?math=a" /> hatására <img src="https://render.githubusercontent.com/render/math?math=B" />-be

##### Automatával felismerhető nyelvek reprezentálhatók

> <img src="https://render.githubusercontent.com/render/math?math=2%20%5Cto%203" /> az ekvivalencia tételben

Minden, automatával felismerhető nyelv reprezentálható reguláris kifejezéssel.

#### Pumpáló lemma reguláris nyelvekre

Minden <img src="https://render.githubusercontent.com/render/math?math=L%20%5Csubseteq%20%5CSigma%5E*" /> reguláris nyelv esetén megadható olyan (<img src="https://render.githubusercontent.com/render/math?math=L" />-től függő) <img src="https://render.githubusercontent.com/render/math?math=k%20%3E%200" /> egész szám, hogy minden <img src="https://render.githubusercontent.com/render/math?math=w%20%5Cin%20L" />-re ha <img src="https://render.githubusercontent.com/render/math?math=%7Cw%7C%20%5Cge%20k" />, akkor van olyan <img src="https://render.githubusercontent.com/render/math?math=w%20%3D%20w_1w_2w_3" /> felbontás, melyre <img src="https://render.githubusercontent.com/render/math?math=0%20%3C%20%7Cw_2%7C" /> és <img src="https://render.githubusercontent.com/render/math?math=%7Cw_1w_2%7C%20%5Cle%20k" />, és minden <img src="https://render.githubusercontent.com/render/math?math=n%20%5Cge%200" />-ra, <img src="https://render.githubusercontent.com/render/math?math=w_1w_2%5Enw_3%20%5Cin%20L" />

> Ha egy <img src="https://render.githubusercontent.com/render/math?math=L" /> nyelvhez nem adható meg ilyen <img src="https://render.githubusercontent.com/render/math?math=k" />, akkor az nem reguláris. Így ezen lemma segítségével bebizonyítható nyelvekről, hogy azok nem regulárisak.

> A <img src="https://render.githubusercontent.com/render/math?math=k" /> szám az <img src="https://render.githubusercontent.com/render/math?math=L" />-et felismerő egyik determinisztikus automata (több is felismeri) állapotainak száma.

#### A pumpáló lemma alkalmazása

A lemma arra használható, hogy nyelvekről belássuk, hogy az nem reguláris.

**Példa**: Az <img src="https://render.githubusercontent.com/render/math?math=L%20%3D%20%5C%7B~%20a%5Enb%5En%20~%20%7C%20~%20n%20%5Cge%200%20~%5C%7D" /> nyelv nem reguláris.

**Bizonyítás**: Tegyük fel, hogy <img src="https://render.githubusercontent.com/render/math?math=L" /> reguláris. Akkor megadható olyan <img src="https://render.githubusercontent.com/render/math?math=k" /> szám, ami teljesíti a pumpáló lemma feltételeit.
Vegyük az <img src="https://render.githubusercontent.com/render/math?math=a%5Ekb%5Ek%20%5Cin%20L" /> szót, melynek hossza <img src="https://render.githubusercontent.com/render/math?math=2k%20%5Cge%20k" />.
A pumpáló lemmában szereplő feltételek szerint létezik <img src="https://render.githubusercontent.com/render/math?math=a%5Ekb%5Ek%20%3D%20w_1w_2w_3" /> felbontás, melyre <img src="https://render.githubusercontent.com/render/math?math=0%20%3C%20%7Cw_2%7C" />, <img src="https://render.githubusercontent.com/render/math?math=%7Cw_1w_2%7C%20%5Cle%20k" /> és minden <img src="https://render.githubusercontent.com/render/math?math=n%20%5Cge%200" />-ra <img src="https://render.githubusercontent.com/render/math?math=w_1w_2%5Enw_3%20%5Cin%20L" />.
Mivel <img src="https://render.githubusercontent.com/render/math?math=%7Cw_1w_2%7C%20%5Cle%20k" />, a középső <img src="https://render.githubusercontent.com/render/math?math=w_2" /> szó csak <img src="https://render.githubusercontent.com/render/math?math=a" /> betűkből áll. Továbbá a <img src="https://render.githubusercontent.com/render/math?math=0%20%3C%20%7Cw_2%7C" /> feltétel miatt a <img src="https://render.githubusercontent.com/render/math?math=w_1w_2%5E2w_3" />, <img src="https://render.githubusercontent.com/render/math?math=w_1w_2%5E3w_3" />, stb szavakban az <img src="https://render.githubusercontent.com/render/math?math=a" />-k száma nagyobb, mint a <img src="https://render.githubusercontent.com/render/math?math=b" />-k száma, tehát ezen szavak egyike sincs <img src="https://render.githubusercontent.com/render/math?math=L" />-ben. Ellentmondás, tehát nem létezik ilyen <img src="https://render.githubusercontent.com/render/math?math=k" /> szám. Akkor viszont az <img src="https://render.githubusercontent.com/render/math?math=L" /> nyelv nem reguláris.

> Tehát az a baj ezzel a nyelvvel, hogy csak <img src="https://render.githubusercontent.com/render/math?math=a" />-kat tudnánk bele pumpálni, de ez kivezet a nyelvből.

#### Következmények

- Egy automata nem képes számolni, hogy két betű ugyanannyiszor szerepel-e.

- Van olyan környezetfüggetlen nyelv, ami nem reguláris. Azaz <img src="https://render.githubusercontent.com/render/math?math=REG%20%5Csubset%20CF" />. Például ilyen az előző <img src="https://render.githubusercontent.com/render/math?math=L" /> nyelv.

### 2. A környezetfüggetlen nyelvtan, és nyelv definíciója. Derivációk, és derivációs fák kapcsolata. Veremautomaták, és környezetfüggetlen nyelvtanok ekvivalenciája. A Bar-Hillel lemma és alkalmazása.

#### Környezetfüggetlen nyelvtan

Egy <img src="https://render.githubusercontent.com/render/math?math=G%20%3D%20(N%2C%20%5CSigma%2C%20P%2C%20S)" /> négyes, ahol:

- <img src="https://render.githubusercontent.com/render/math?math=N" /> egy ábécé, a **nemterminális ábécé**

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> egy ábécé a **terminális ábécé**, amire <img src="https://render.githubusercontent.com/render/math?math=N%20%5Ccap%20%5CSigma%20%3D%20%5Cemptyset" />

- <img src="https://render.githubusercontent.com/render/math?math=S%20%5Cin%20N" /> a **kezdő szimbólum**

- <img src="https://render.githubusercontent.com/render/math?math=P" /> pedig <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20%5Calpha" /> alakú ún. **átírási szabályok véges halmaza**, ahol <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cin%20N" />, és <img src="https://render.githubusercontent.com/render/math?math=%5Calpha%20%5Cin%20(N%20%5Ccup%20%5CSigma)" />

##### Környezetfüggetlen nyelvek

Egy <img src="https://render.githubusercontent.com/render/math?math=L" /> nyelvet környezetfüggetlennek hívunk, ha van olyan <img src="https://render.githubusercontent.com/render/math?math=G" /> környezetfüggetlen nyelvtan, melyre <img src="https://render.githubusercontent.com/render/math?math=L%20%3D%20L(G)" />.

Az összes környezetfüggetlen nyelvek halmazát <img src="https://render.githubusercontent.com/render/math?math=CF" />-fel jelöljük.

Például az <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20a%5Enb%5En%20~%20%7C%20~%20n%20%5Cge%200%20~%20%5C%7D" /> nyelv környezetfüggetlen.

##### Deriváció

Tetszőleges <img src="https://render.githubusercontent.com/render/math?math=%5Cgamma%2C%20%5Cdelta%20%5Cin%20(N%20%5Ccup%20%5CSigma)%5E*" /> esetén <img src="https://render.githubusercontent.com/render/math?math=%5Cgamma%20%5CRightarrow_G%20%5Cdelta" />, ha van olyan <img src="https://render.githubusercontent.com/render/math?math=A%20%5Cto%20%5Calpha%20%5Cin%20P" /> szabály és vannak olyan <img src="https://render.githubusercontent.com/render/math?math=%5Calpha'%2C%20%5Cbeta'%20%5Cin%20(N%20%5Ccup%20%5CSigma)%5E*" /> szavak, amelyekre fennállnak, hogy <img src="https://render.githubusercontent.com/render/math?math=%5Cgamma%20%3D%20%5Calpha'%20A%20%5Cbeta'%2C%20%5Cdelta%20%3D%20%5Calpha'%5Calpha%5Cbeta'" />.

> Azaz, ha egy átírással (valamelyik P-beli szabály mentén) átvihető.

###### Fajtái

- <img src="https://render.githubusercontent.com/render/math?math=%5Cgamma%20%5CRightarrow_G%20%5Cdelta" />: Egy lépés, közvetlen levezetés, közvetlen deriváció

- <img src="https://render.githubusercontent.com/render/math?math=%5Cgamma%20%5CRightarrow%5En_G%20%5Cdelta%2C%20n%20%5Cge%200" />: n lépés (0 lépés önmagába viszi)

- <img src="https://render.githubusercontent.com/render/math?math=%5Cgamma%20%5CRightarrow%5E%2B_G%20%5Cdelta" />: Legalább egy lépés

- <img src="https://render.githubusercontent.com/render/math?math=%5Cgamma%20%5CRightarrow%5E*_G%20%5Cdelta" />: Valamennyi (akár 0) lépés

> A <img src="https://render.githubusercontent.com/render/math?math=G" /> alsó indexben elhagyható, ha 1 db nyelvtanról van éppen szó.

##### Generált (környezetfüggetlen) nyelv

A <img src="https://render.githubusercontent.com/render/math?math=G%20%3D%20(N%2C%20%5CSigma%2C%20P%2C%20S)" /> környezetfüggetlen nyelvtan által generált nyelv:

<img src="https://render.githubusercontent.com/render/math?math=L(G)%20%3D%20%5C%7B~%20w%20%5Cin%20%5CSigma%5E*%20~%20%7C%20~%20S%20%5CRightarrow%5E*_G%20w%20~%20%5C%7D" />

> Azaz az összes olyan szó, ami <img src="https://render.githubusercontent.com/render/math?math=G" />-ből levezethető.

#### Derivációs fák, kapcsolatuk a derivációkkal

Az <img src="https://render.githubusercontent.com/render/math?math=X%20%5Cin%20(N%20%5Ccup%20%5CSigma)" /> gyökerű derivációs fák halmaza a legszűkebb olyan <img src="https://render.githubusercontent.com/render/math?math=D_X" /> halmaz, amelyre:

- Az a fa, amelynek egyetlen szögpontja (vagyis csak gyökere) az <img src="https://render.githubusercontent.com/render/math?math=X" />, eleme <img src="https://render.githubusercontent.com/render/math?math=D_X" />-nek.
- Ha <img src="https://render.githubusercontent.com/render/math?math=X%20%5Cto%20%5Cepsilon%20%5Cin%20P" />, akkor az a fa, amelynek gyökere <img src="https://render.githubusercontent.com/render/math?math=X" />, a gyökerének egyetlen leszármazottja az <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />, eleme <img src="https://render.githubusercontent.com/render/math?math=D_X" />-nek.
- Ha <img src="https://render.githubusercontent.com/render/math?math=X%20%5Cto%20X_1...X_k%20%5Cin%20P" />, továbbá <img src="https://render.githubusercontent.com/render/math?math=t_1%20%5Cin%20D_%7BX_1%7D%2C%20...%2C%20t_k%20%5Cin%20D_%7BX_k%7D" />, akkor az a fa, amelynek gyökere <img src="https://render.githubusercontent.com/render/math?math=X" />, a gyökeréből <img src="https://render.githubusercontent.com/render/math?math=k" /> él indul rendre a <img src="https://render.githubusercontent.com/render/math?math=t_1%2C%20...%2C%20t_k" /> fák gyökeréhez, eleme <img src="https://render.githubusercontent.com/render/math?math=D_X" />-nek.

![ ](../img/derivacios_fa.png)

 Legyen <img src="https://render.githubusercontent.com/render/math?math=t" /> egy <img src="https://render.githubusercontent.com/render/math?math=X" /> gyökerű derivációs fa. Akkor <img src="https://render.githubusercontent.com/render/math?math=t" /> magassságát <img src="https://render.githubusercontent.com/render/math?math=h(t)" />-vel, a határát pedig <img src="https://render.githubusercontent.com/render/math?math=fr(t)" />-vel jelöljük és az alábbi módon definiáljuk:

- Ha <img src="https://render.githubusercontent.com/render/math?math=t" /> az egyetlen <img src="https://render.githubusercontent.com/render/math?math=X" /> szögpontból álló fa, akkor <img src="https://render.githubusercontent.com/render/math?math=h(t)%20%3D%200" /> és <img src="https://render.githubusercontent.com/render/math?math=fr(t)%20%3D%20X" />.

- Ha <img src="https://render.githubusercontent.com/render/math?math=t" /> gyökere <img src="https://render.githubusercontent.com/render/math?math=X" />, aminek egyetlen leszármazottja <img src="https://render.githubusercontent.com/render/math?math=%5Cepsilon" />, akkor <img src="https://render.githubusercontent.com/render/math?math=h(t)%20%3D%201" />, és <img src="https://render.githubusercontent.com/render/math?math=fr(t)%20%3D%20%5Cepsilon" />.

- Ha <img src="https://render.githubusercontent.com/render/math?math=t" /> gyökere <img src="https://render.githubusercontent.com/render/math?math=X" />, amiből <img src="https://render.githubusercontent.com/render/math?math=k" /> él indul rendre a <img src="https://render.githubusercontent.com/render/math?math=t_1%2C%20...%2C%20t_k" /> közvetlen részfák gyökeréhez, akkor <img src="https://render.githubusercontent.com/render/math?math=h(t)%20%3D%201%20%2B%20max%5C%7B%20~%20h(t_i%20~%20%7C%20~%201%20%5Cle%20i%20%5Cle%20k)%20~%20%5C%7D" /> és <img src="https://render.githubusercontent.com/render/math?math=fr(t)%20%3D%20fr(t_1)...fr(t_k)" />.

> Azaz <img src="https://render.githubusercontent.com/render/math?math=h(t)" /> a <img src="https://render.githubusercontent.com/render/math?math=t" />-ben levő olyan utak hosszának maximuma, amelyek <img src="https://render.githubusercontent.com/render/math?math=t" /> gyökeréből annak valamely leveléhez vezetnek.

> Azaz <img src="https://render.githubusercontent.com/render/math?math=fr(t)" /> azon <img src="https://render.githubusercontent.com/render/math?math=(N%20%5Ccup%20%5CSigma)%5E*" />-beli szó, amelyet <img src="https://render.githubusercontent.com/render/math?math=t" /> leveleinek balról jobbra (vagy: preorder bejárással) történő leolvasásával kapunk.

##### Az összefüggés derivációs fák, és derivációk közt

Tetszőleges <img src="https://render.githubusercontent.com/render/math?math=X%20%5Cin%20(N%20%5Ccup%20%5CSigma)" /> és <img src="https://render.githubusercontent.com/render/math?math=%5Calpha%20%5Cin%20(N%20%5Ccup%20%5CSigma)%5E*" /> esetén <img src="https://render.githubusercontent.com/render/math?math=X%20%5CRightarrow%5E*%20%5Calpha" /> akkor, és csak akkor, ha van olyan <img src="https://render.githubusercontent.com/render/math?math=t%20%5Cin%20D_X" /> derivációs fa, amelyre <img src="https://render.githubusercontent.com/render/math?math=fr(t)%20%3D%20%5Calpha" />.

##### Az összefüggés következményei

- Tetszőleges <img src="https://render.githubusercontent.com/render/math?math=w%20%5Cin%20%5CSigma%5E*" /> esetén <img src="https://render.githubusercontent.com/render/math?math=S%20%5CRightarrow%5E*%20w" /> akkor és csak akkor, ha van olyan <img src="https://render.githubusercontent.com/render/math?math=S" /> gyökerű derivációs fa, amelynek határa <img src="https://render.githubusercontent.com/render/math?math=w" />.

> Ez csak a korábbi tétel alkalmazása <img src="https://render.githubusercontent.com/render/math?math=S" />-re, és egy <img src="https://render.githubusercontent.com/render/math?math=w" />-re.

- Tetszőleges <img src="https://render.githubusercontent.com/render/math?math=w%20%5Cin%20%5CSigma%5E*" /> esetén a következő állítások ekvivalensek:
  
  - <img src="https://render.githubusercontent.com/render/math?math=w%20%5Cin%20L(G)" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=S%20%5CRightarrow%5E*%20w" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=S%20%5CRightarrow%5E*_l%20w" /> (ez bal oldali deriváció, mindig a legbaloldalibb nemterminálist lehet csak helyettesíteni)
  
  - van olyan <img src="https://render.githubusercontent.com/render/math?math=S" /> gyökerű derivációs fa, amelynek határa <img src="https://render.githubusercontent.com/render/math?math=w" />.

##### Generált nyelv definiálása derivációs fákkal

<img src="https://render.githubusercontent.com/render/math?math=L(G)%20%3D%20%5C%7B%20~%20fr(t)%20~%20%7C%20~%20t%20%5Cin%20D_S%2C%20fr(t)%20%5Cin%20%5CSigma%5E*%20~%20%5C%7D" />
## Logika és informatikai alkalmazásai

### 1. Normálformák az ítéletkalkulusban, Boole-függvények teljes rendszerei. Következtető módszerek: Hilbert-kalkulus és rezolúció, ezek helyessége és teljessége.

#### Normálformák az ítéletkalkulusban

##### * Ítéletkalkulus-beli formulák

- Minden **változó**, és minden **logikai konstans** formula

- Ha <img src="https://render.githubusercontent.com/render/math?math=F" /> formula, akkor <img src="https://render.githubusercontent.com/render/math?math=(%20%5Cneg%20F%20)" /> is formula

- Ha <img src="https://render.githubusercontent.com/render/math?math=F" /> és <img src="https://render.githubusercontent.com/render/math?math=G" /> formulák, akkor <img src="https://render.githubusercontent.com/render/math?math=(F%20%5Cland%20G)%2C%20(F%20%5Clor%20G)%2C%20(F%20%5Cleftrightarrow%20G)" /> is formulák

- **Más formula nincs**

##### Konjunktív normálforma (CNF)

- **Literál**: CNF legkisebb eleme, lehet egy **válzotó**, vagy egy **változó negáltja**.
  
  - **Negatív literál**: Ha egy változó negáltja alkotja.
  
  - **Pozitív literál**: Ha egy nem negált változó alkotja.

- **Klóz**: Véges sok **literál diszjunkciója** (vagyolása).
  
  - **Egységklóz**: 1db változóból álló klóz.
  
  - **Üres klóz**: 0db változóból álló klóz.
    
    - Értéke minden értékadás mellett **hamis**.
    
    - Jele: <img src="https://render.githubusercontent.com/render/math?math=%5Csquare" />

- **CNF**: **Klózok konjunkciója** (éselése).
  
  - **Üres CNF**: 0db klózt tartalmaz.
    
    - Értéke minden értékadás mellett **igaz**.
    
    - Jele: <img src="https://render.githubusercontent.com/render/math?math=%5Cemptyset" />

> Üres klóz az inputban jellemzően nincs, de az algoritmusok generálhatnak.

###### Minden formula ekvivalens CNF alakra hozható.

1. <img src="https://render.githubusercontent.com/render/math?math=%5Cto" /> és <img src="https://render.githubusercontent.com/render/math?math=%5Cleftrightarrow" /> konnektívák eliminálása.

2. <img src="https://render.githubusercontent.com/render/math?math=%5Cneg" />-k bevitele változók mellé deMorgan azonosságokkal.

3. <img src="https://render.githubusercontent.com/render/math?math=%5Clor" /> jelek bevitele a <img src="https://render.githubusercontent.com/render/math?math=%5Cland" /> jelek alá disztributivitás alkalmazásával.

> Disztributivitás szabályai:
> <img src="https://render.githubusercontent.com/render/math?math=F%20%5Clor%20(G%20%5Cland%20H)%20%5Cequiv%20(F%20%5Clor%20G)%20%5Cland%20(F%20%5Clor%20H)" />
> <img src="https://render.githubusercontent.com/render/math?math=(F%20%5Cland%20G)%20%5Clor%20H%20%5Cequiv%20(F%20%5Clor%20H)%20%5Cland%20(G%20%5Clor%20H)" />

> A "konnektíva" azt jelenti, hogy az operátor formulákat vár (köt össze), nem változókat (az a Boole-függvény).

###### CNF-ek reprezentálása

Nem stringként, hanem:

- egy klózt a benne szereplő literálok halmazaként,

- egy CNF-et pedig a klózainak halmazaként.

> Ezt azért tehetjük meg, mert sem a vagyolás, sem az éselés esetén nem számít a sorrend, illetve az érintett változók multiplicitása sem, pl. <img src="https://render.githubusercontent.com/render/math?math=(p%20%5Clor%20p)%20%5Cland%20(q%20%5Clor%20q)" /> ugyan az, mint <img src="https://render.githubusercontent.com/render/math?math=q%20%5Clor%20p" /> (sorrend fordult, multiplicitás eltűnt).

##### Diszjunktív normálforma

Ugyan az, mint a CNF, csak nem "vagyolások éselése", hanem "éselések vagyolása".

##### Negációs normálforma

Ha <img src="https://render.githubusercontent.com/render/math?math=%5Cneg" /> csak változó előtt szerepel, és <img src="https://render.githubusercontent.com/render/math?math=%5Cneg" />-en kívül csak <img src="https://render.githubusercontent.com/render/math?math=%5Clor" /> és <img src="https://render.githubusercontent.com/render/math?math=%5Cland" /> szerepel.

> Ilyet kapunk ha a CNF-re hozást csak a 2. lépésig csináljuk.

#### Boole-függvények teljes rendszerei

##### * Boole függvény (<img src="https://render.githubusercontent.com/render/math?math=n" />-változós)

Bitvektort egy bitbe képező függvény: <img src="https://render.githubusercontent.com/render/math?math=f%3A%20%5C%7B%20~%200%2C%201%20~%20%5C%7D%5En%20%5Cto%20%5C%7B%20~%200%2C%201%20~%20%5C%7D" />

<img src="https://render.githubusercontent.com/render/math?math=f" /> egy <img src="https://render.githubusercontent.com/render/math?math=n" />-változós függvény jelölése: <img src="https://render.githubusercontent.com/render/math?math=f%20%2F%20n" />

A <img src="https://render.githubusercontent.com/render/math?math=%5Cneg" /> unáris, egyváltozós Boole-függvény

A többi 4 megadható 4 soros igazságtáblával.

##### * Indukált Boole-függvény

Ha az <img src="https://render.githubusercontent.com/render/math?math=F" /> formulában csak a <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20p_1%2C%20...%2C%20p_n%20~%20%5C%7D" /> változók szerepelnek, akkor <img src="https://render.githubusercontent.com/render/math?math=F" /> indukál egy <img src="https://render.githubusercontent.com/render/math?math=n" />-változós Boole-függvényt, melyet szintén <img src="https://render.githubusercontent.com/render/math?math=F" />-el jelölünk:

- <img src="https://render.githubusercontent.com/render/math?math=p_i(x_1%2C%20...%2C%20x_n)%20%20%3A%3D%20x_i" /> (ez **projekció** / tömbelem kiválasztás)

- <img src="https://render.githubusercontent.com/render/math?math=(%5Cneg%20F)(x_1%2C%20...%2C%20x_n)%20%3A%3D%20%5Cneg%20(F(x_1%2C%20...%2C%20x_n))" />

- <img src="https://render.githubusercontent.com/render/math?math=(F%20%5Clor%20G)(x_1%2C%20...%2C%20x_n)%20%3A%3D%20F(x_1%2C%20...%2C%20x_n)%20%5Clor%20G(x_1%2C%20...%2C%20x_n)" />

- ...

> A Boole-függvénynek átadott bitvektor tulajdonképpen a formula egy értékadása. A visszaadott bit pedig a formula kiértékelésének eredménye.

##### * Boole-függvények megszorítása

Legyen <img src="https://render.githubusercontent.com/render/math?math=f%2Fn" /> a Boole-függvény, <img src="https://render.githubusercontent.com/render/math?math=n%20%3E%200" />. Ha <img src="https://render.githubusercontent.com/render/math?math=b%20%5Cin%20%5C%7B%20~%200%2C%201%20~%20%5C%7D" /> igazságérték, úgy <img src="https://render.githubusercontent.com/render/math?math=f%7C_%7Bx_n%3Db%7D" /> jelöli azt az <img src="https://render.githubusercontent.com/render/math?math=(n%20-%201)" /> változós Boole-függvényt, melyet úgy kapunk, hogy <img src="https://render.githubusercontent.com/render/math?math=f" /> inputjában <img src="https://render.githubusercontent.com/render/math?math=x_n" /> értékét rögzítjük <img src="https://render.githubusercontent.com/render/math?math=b" />-re.

Azaz: <img src="https://render.githubusercontent.com/render/math?math=f%7C_%7Bx_n%20%3D%20b%7D(x_1%2C%20...%2C%20x_%7Bn-1%7D)%20%3A%3D%20f(x_1%2C%20...%2C%20x_%7Bn-1%7D%2C%20b)" />

Például:

- <img src="https://render.githubusercontent.com/render/math?math=%5Clor%20%7C_%7Bx_2%20%3D%201%7D" /> a konstans 1 függvény.

- <img src="https://render.githubusercontent.com/render/math?math=%5Cland%20%7C_%7Bx_2%20%3D%200%7D" /> a konstans 0 függvény.

> Bármenyik koordinátát lehet rögzíteni, nem csak az utolsót.

##### Teljes rendszerek

Boole-függvények egy <img src="https://render.githubusercontent.com/render/math?math=H" /> rendszere teljes, vagy adekvált, ha minden <img src="https://render.githubusercontent.com/render/math?math=n" />-változós Boole-függvény előáll

- a **projekcióból**

- és <img src="https://render.githubusercontent.com/render/math?math=H" /> elemeiből

- alkalmas **kompozícióval**.

###### Kompozíció

Ha <img src="https://render.githubusercontent.com/render/math?math=f%2Fn" /> és <img src="https://render.githubusercontent.com/render/math?math=g_1%2Fk%2C%20...%2C%20g_n%2Fk" /> Boole-függvények, akkor az <img src="https://render.githubusercontent.com/render/math?math=f%20%5Ccirc%20%5Clang%20g_1%2C%20...%2C%20g_n%20%5Crang" /> az a <img src="https://render.githubusercontent.com/render/math?math=k" />-változós Boole-függvény, melyre: <img src="https://render.githubusercontent.com/render/math?math=(f%20%5Ccirc%20%5Clang%20g_1%2C%20...%2C%20g_n%20%5Crang)(x_1%2C%20...%2C%20x_n)%20%3D%20f(g_1(x_1%2C%20...%2C%20x_k)%2C%20...%2C%20g_n(x_1%2C%20...%2C%20x_k))" />

> Azaz egy függvényt úgy hívunk meg, hogy az inputjai függvényhívások eredményei.

##### Shannon expanzió

<img src="https://render.githubusercontent.com/render/math?math=f(x_1%2C%20...%2C%20x_n)%20%3D%20(x_n%20%5Cland%20f%20%7C_%7Bx_n%20%3D%201%7D(x_1%2C%20...%2C%20x_%7Bn-1%7D))%20%5Clor%20(%20%5Cneg%20x_n%20%5Cland%20f%20%7C_%7Bx_n%20%3D%200%7D(x_1%2C%20...%2C%20x_%7Bn-1%7D))" />

> Lényegében ezzel azt írtuk le, hogy az <img src="https://render.githubusercontent.com/render/math?math=x_n" /> értéke vagy úgy igaz a formula, hogy <img src="https://render.githubusercontent.com/render/math?math=x_n%20%3D%201" />, vagy úgy, hogy <img src="https://render.githubusercontent.com/render/math?math=x_n%20%3D%200" />.

Ennek a következménye: Minden Boole függvény előáll a projekciók, és a <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20%5Cneg%2C%20%5Cland%2C%20%5Clor%20~%20%5C%7D" /> alkalmas kompozíciójaként. (Hiszen az előző összefüggésben csak ezeket használjuk fel, és ez ismételhető amíg nem kötöttünk le minden változót.)

Ezt úgy is lehet mondani, hogy a <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20%5Cneg%2C%20%5Clor%2C%20%5Cland%20~%20%5C%7D" /> **rendszer teljes**.

Ebből az is következik, hogy minden Boole-függvény indukálható olyan formulával, melyben csak a <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20%5Cneg%2C%20%5Cland%2C%20%5Clor%20~%20%5C%7D" /> konnektívák szerepelnek.

##### További teljes rendszerek

- <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20%5Cneg%2C%20%5Cland%20~%20%5C%7D" />: Mivel <img src="https://render.githubusercontent.com/render/math?math=x_1%20%5Cland%20x_1%20%3D%20%5Cneg%20(%5Cneg%20x_1%20%5Clor%20%5Cneg%20x_2)" />

- <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20%5Cto%2C%20%5Cdownarrow%20~%20%5C%7D" /> `// Hilbert rendszere`

- <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20%5Ctext%7BNAND%7D%20~%20%5C%7D" />

- <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20%5Ctext%7BNOR%7D%20~%20%5C%7D" />

> A NAND-on, és NOR-on kívül nincs másik olyan <img src="https://render.githubusercontent.com/render/math?math=f%2F2" /> Boole-függvény, ami egyedül is teljes rendszert alkot.

#### Hilbert rendszere

Egy input <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> **formulahalmaz** összes következményét (és csak a következményeket) lehet vele levezetni.

Az ítéletváltozókon kívül ebben a rendszerben csak a <img src="https://render.githubusercontent.com/render/math?math=%5Cto" /> konnektívát, és a <img src="https://render.githubusercontent.com/render/math?math=%5Cdownarrow" /> logikai konstanst használhatjuk.

> Minden formula ilyan alakra hozható, mert <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20%5Cto%2C%20%5Cdownarrow%20~%20%5C%7D" /> teljes rendszer.

##### A Hilbert rendszer axiómái

- <img src="https://render.githubusercontent.com/render/math?math=(F%20%5Cto%20(G%20%5Cto%20H))%20%5Cto%20((F%20%5Cto%20G)%20%5Cto%20(F%20%5Cto%20H))" />

- <img src="https://render.githubusercontent.com/render/math?math=F%20%5Cto%20(G%20%5Cto%20F)" />

- <img src="https://render.githubusercontent.com/render/math?math=((F%20%5Cto%20%5Cdownarrow%20)%5Cto%20%5Cdownarrow)%20%5Cto%20F" />

> EZen a formulák **tautológiák**. Azaz minden értékadás mellett igazak.

##### Az axiómák példányai

A 3 axióma egy **példánya**: valamelyik axiómában szereplő <img src="https://render.githubusercontent.com/render/math?math=F%2C%20G%2C%20H" /> helyére **tetszőleges formulát** írunk.

Ennek van jelölése is: Ha <img src="https://render.githubusercontent.com/render/math?math=F" /> egy formula, melyben a <img src="https://render.githubusercontent.com/render/math?math=p_1%2C%20...%2C%20p_n" /> változók szerepelnek, és <img src="https://render.githubusercontent.com/render/math?math=F_1%2C%20...%2C%20F_n" /> formulák, akkor <img src="https://render.githubusercontent.com/render/math?math=F%5Bp_1%2FF_1%2C%20...%2C%20p_n%2FF_n%5D" /> jelöli azt a formulát, melyet úgy kapunk <img src="https://render.githubusercontent.com/render/math?math=F" />-ből, hogy benne minden <img src="https://render.githubusercontent.com/render/math?math=p_i" /> helyére az <img src="https://render.githubusercontent.com/render/math?math=F_i" /> formulát írjuk.

##### Leválasztási következtetés, avagy modus ponens

<img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20F%2C%20F%20%5Cto%20G%20~%20%5C%7D%20%5CvDash%20G" />

> Ha <img src="https://render.githubusercontent.com/render/math?math=F" />-et, és <img src="https://render.githubusercontent.com/render/math?math=F%20%5Cto%20G" />-t már levezettük, azaz az eredeti formulánknak ők logikai következményei, akkor felvehetjük <img src="https://render.githubusercontent.com/render/math?math=G" />-t is, mert ő is logikai következmény.

##### Levezetés Hilbert rendszerében

Legyen <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> formulák egy halmaza, <img src="https://render.githubusercontent.com/render/math?math=F" /> pedig egy formula. Azt mondjuk, hogy <img src="https://render.githubusercontent.com/render/math?math=F" /> **levezethető** <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-ból **Hilbert rendszerében**, jelben <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5Cvdash%20F" />, ha van olyan <img src="https://render.githubusercontent.com/render/math?math=F_1%2C%20F_1%2C%20...%2C%20F_n" /> formula-sorozat, melynek minden eleme

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-beli vagy

- **axiómapéldány** vagy

- előáll két korábbiból **modus ponenssel**

és melyre <img src="https://render.githubusercontent.com/render/math?math=F_n%20%3D%20F" />. (Ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> üres, akkor <img src="https://render.githubusercontent.com/render/math?math=%5Cemptyset%20%5Cvdash%20F" /> helyett <img src="https://render.githubusercontent.com/render/math?math=%5Cvdash%20F" />-et is írhatunk) 

##### Helyesség, teljesség

###### Tautológia példányai is tautológiák

Tehát a Hilbert-rendszer **axióma-példányai tautológiák**.

Ez egy általánosabb összefüggés következménye:

Legyenek az <img src="https://render.githubusercontent.com/render/math?math=F" /> formulában szereplő változók <img src="https://render.githubusercontent.com/render/math?math=p_1%2C%20...%2C%20p_n" />, és <img src="https://render.githubusercontent.com/render/math?math=F_1%2C%20...%2C%20F_n" /> további formulák (melyekben más változók is előfordulhatnak).
Legyen <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D" /> egy tetszőleges értékadás.
Definiáljuk <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BB%7D" /> értékadást a következőképpen: <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BB%7D(p_i)%20%3A%3D%20%5Cmathcal%7BA%7D(F_i)" />
(a <img src="https://render.githubusercontent.com/render/math?math=p_i" /> értéke <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BB%7D" />-ben legyen az az érték, ami <img src="https://render.githubusercontent.com/render/math?math=F_i" /> értéke <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D" />-ban)
Ekkor: <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BB%7D(F)%20%3D%20%5Cmathcal%7BA%7D(F%5Bp_1%2FF_1%2C%20...%2C%20p_n%2FF_n%5D)" />

###### Helyesség

Ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5Cvdash%20F" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20F" />.

> Azaz, ha egy formulát le lehet vezetni <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-ból Hilbert rendszerében, akkor az következménye is <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-nak.

**Bizonyítás**:

- Legyen <img src="https://render.githubusercontent.com/render/math?math=F_1%2C%20...%2C%20F_n" /> egy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> fölötti levezetése <img src="https://render.githubusercontent.com/render/math?math=F" />-nek. Teljes indukcióval megmutatjuk, hogy minden <img src="https://render.githubusercontent.com/render/math?math=i" />-re <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20F_i" />

- Ha <img src="https://render.githubusercontent.com/render/math?math=F_i%20%5Cin%20%5CSigma" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20F_i" />

- Ha <img src="https://render.githubusercontent.com/render/math?math=F_i" /> axiómapéldány, akkor <img src="https://render.githubusercontent.com/render/math?math=%5Cemptyset%20%5CvDash%20F_i" /> (tautológiák minden elméletben szerepelnek, és az axiómapéldányok a korábbi szabály miatt tautológiák), így a monotonitás miatt <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20F_i" /> is igaz (nyílván ha az <img src="https://render.githubusercontent.com/render/math?math=%5Cemptyset" />-nak következménye, akkor egy bővebb halmaznak, a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-nak is).

- Ha pedig <img src="https://render.githubusercontent.com/render/math?math=F_i%20%3D%20MP(F_j%2C%20F_k)" /> a <img src="https://render.githubusercontent.com/render/math?math=j%2C%20k%20%3C%20i" /> indexekre, akkor
  
  - Az indukciós feltevés szerint <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20F_j" /> és <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20F_k" /> (feltételezzük, hogy a korábban felvett formulák már logikai következmények)
  
  - Tehát <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20%5C%7B%20~%20F_j%2C%20F_k%20~%20%5C%7D" />
  
  - MP def miatt <img src="https://render.githubusercontent.com/render/math?math=F_k%20%3D%20F_j%20%5Cto%20F_i%3A%20%5CSigma%20%5CvDash%20%5C%7B%20~%20F_j%2C%20F_j%20%5Cto%20F_i%20~%20%5C%7D" />
  
  - A leválasztási következtetés: <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20F_j%2C%20F_j%20%5Cto%20F_i%20~%20%5C%7D%20%5CvDash%20F_i" />
  
  - A tranzitivitás miatt tehát <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20F_i" /> (tranzitivitást kihasználjuk, mivel <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20%7B%20~%20F_j%2C%20F_j%20%5Cto%20F_i%20~%20%7D%20%5CvDash%20F_i" />)

Így a **Hilbert-rendszer egy helyes következtető rendszer**.

###### Teljesség

**Dedukciós tétel**: Tetszőleges <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> formulahalmazra, és <img src="https://render.githubusercontent.com/render/math?math=F" />, <img src="https://render.githubusercontent.com/render/math?math=G" /> formulákra <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5Cvdash%20(F%20%5Cto%20G)%20%5CLeftrightarrow%20%5CSigma%20%5Ccup%20%5C%7B%20~%20F%20~%20%5C%7D%20%5Cvdash%20G" /> 

**H-konzisztens halmazok**: Egy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> formulahalmazt H-konzisztensnek nevezünk, ha **nem igaz**, hogy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5Cvdash%20%5Cdownarrow" />

> Csak simán az, hogy **konzisztens** formulahalmaz, az azt jelenti, hogy **kielégíthető**.

Ekvikalens állítások tetszőleges <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> formulahalmazra:

- Van olyan <img src="https://render.githubusercontent.com/render/math?math=F" /> formula, melyre <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5Cvdash%20F" /> és <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5Cvdash%20(F%20%5Cto%20%5Cdownarrow)" /> is igaz.

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> **nem** H-kozisztens.

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5Cvdash%20F" /> minden <img src="https://render.githubusercontent.com/render/math?math=F" /> formulára.

**Maximális H-konzisztens halmazok**: Egy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> formulahalmazt maximális H-konzisztensnek nevezünk, ha

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> H-konzisztens, és

- minden <img src="https://render.githubusercontent.com/render/math?math=F%20%5Cnotin%20%5CSigma" />-ra <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5Ccup%20%5C%7B%20~%20F%20~%20%5C%7D" /> már nem H-konzisztens.

> Minden <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> H-konzisztens halmazhoz van <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%20%5Csupseteq%20%5CSigma" /> maximális H-konzisztens halmaz. "A halmmazt fel lehet fújni."

Ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> maximális H-konzisztens halmaz, akkor tetszőleges <img src="https://render.githubusercontent.com/render/math?math=F" /> formulára vagy <img src="https://render.githubusercontent.com/render/math?math=F%20%5Cin%20%5CSigma" />, vagy <img src="https://render.githubusercontent.com/render/math?math=(F%20%5Cto%20%5Cdownarrow%20)%20%5Cin%20%5CSigma" />, de nem mindkettő.

> Azaz minden **formulát, vagy a negáltját** tartalmazzák, de csak az egyiket.

Tetszőleges <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> formulahalmaz pontosan akkor kielégíthető, ha H-konzisztens.

**A Hilbert-rendszer helyessége és teljessége**:

Ezt kell belátni: <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20F%20%5CLeftrightarrow%20%5CSigma%20%5Cvdash%20F" />

> Most itt egyszerre van belátva mindkettő, de a helyesség fentebbi alapján külön is belátható.

Sorban minden ekvivalenciát tovább feltünk ekvivalencia mentén:

<img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20F%20~%20~%20%5CLeftrightarrow%20~%20~%20%5CSigma%20%5Ccup%20%5C%7B%20~%20F%20%5Cto%20%5Cdownarrow%20~%20%5C%7D%20%5CvDash%20%5Cdownarrow" />

> Ennek az alapja egy tétel: <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20F" /> pontosan akkor igaz, ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5Ccup%20%5C%7B%20~%20%5Cneg%20F%20~%20%5C%7D" /> kielégíthetetlen. Ez van itt felírva Hilbert-rendszerében.

<img src="https://render.githubusercontent.com/render/math?math=%5CLeftrightarrow%20~%20~%20%5CSigma%20%5Ccup%20%5C%7B%20~%20F%20%5Cto%20%5Cdownarrow%20~%20%5C%7D%20%5Cvdash%20%5Cdownarrow" />

> Itt a bal oldal azt jelenti, hogy az a halmaz kielágíthetetlen (az összeuniózott). Akkor ez a halmaz nem H-konzisztens, és ekkor levezethető belőle Hilbert-rendszerében az azonosan hamis.

<img src="https://render.githubusercontent.com/render/math?math=%5CLeftrightarrow%20~%20~%20%5CSigma%20%5Cvdash%20(F%20%5Cto%20%5Cdownarrow%20)%20%5Cto%20%5Cdownarrow" />

> Dedukciós tétel alkalmazása.

<img src="https://render.githubusercontent.com/render/math?math=%5CLeftrightarrow%20~%20~%20%5CSigma%20%5Cvdash%20F" />

Ennek a legutolsó lépésnek a belátása kicsit nehezebb:

- Egyik irány: <img src="https://render.githubusercontent.com/render/math?math=(%5CSigma%20%5Cvdash%20(F%20%5Cto%20%5Cdownarrow%20)%20%5Cto%20%5Cdownarrow)%20%5Cto%20(%5CSigma%20%5Cvdash%20F)" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=((F%20%5Cto%20%5Cdownarrow%20)%20%5Cto%20%5Cdownarrow%20)%20%5Cto%20F" />
  
  - > A 3. axióma példányosítása
  
  - <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5Cvdash%20F" />
  
  - > Modus ponens alkalmazása

- Másik irány: <img src="https://render.githubusercontent.com/render/math?math=(%5CSigma%20%5Cvdash%20F)%20%5Cto%20(%5CSigma%20%5Cvdash%20(F%20%5Cto%20%5Cdownarrow%20)%20%5Cto%20%5Cdownarrow)" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=((F%20%5Cto%20%5Cdownarrow)%20%5Cto%20(F%20%5Cto%20%5Cdownarrow%20))%20%5Cto%20(((F%20%5Cto%20%5Cdownarrow)%20%5Cto%20F)%20%5Cto%20((F%20%5Cto%20%5Cdownarrow)%20%5Cto%20%5Cdownarrow%20))" />
  
  - > Az 1. axióma példányosítása
  
  - <img src="https://render.githubusercontent.com/render/math?math=(F%20%5Cto%20%5Cdownarrow)%20%5Cto%20(F%20%5Cto%20%5Cdownarrow)" />
  
  - > Ilyet ér felvenni, hiszen <img src="https://render.githubusercontent.com/render/math?math=G%20%5Cto%20G" /> alakú, és erre volt példa, hogy az ilyenek az <img src="https://render.githubusercontent.com/render/math?math=%5Cemptyset" />-nak is logikai következményei.
  
  - <img src="https://render.githubusercontent.com/render/math?math=((F%20%5Cto%20%5Cdownarrow%20)%20%5Cto%20F)%20%5Cto%20((F%20%5Cto%20%5Cdownarrow)%20%5Cto%20%5Cdownarrow)" />
  
  - > Előző kettő MP-el
  
  - <img src="https://render.githubusercontent.com/render/math?math=F%20%5Cto%20((F%20%5Cto%20%5Cdownarrow)%20%5Cto%20F%20)" />
  
  - > A 2. axióma példánya
  
  - <img src="https://render.githubusercontent.com/render/math?math=(F%20%5Cto%20%5Cdownarrow)%20%5Cto%20F" />
  
  - > Előző formula, és feltevés miatt <img src="https://render.githubusercontent.com/render/math?math=F" /> MP-e
  
  - <img src="https://render.githubusercontent.com/render/math?math=(F%20%5Cto%20%5Cdownarrow)%20%5Cto%20%5Cdownarrow" />
  
  - > Előző, és az előtt kettővel levő formulák MP-je

Az ekvivalenciák mentén beláttuk, hogy **Hilbert-rendszere helyes, és teljes**. Azaz tetszőleges <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> halmazból Hilbert rendszerében **pontosan** <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> következményei vezethetőek le.

#### Rezolúció

##### Rezolúciós következtetés

<img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20F%20%5Clor%20G%2C%20%5Cneg%20F%20%5Clor%20H%20~%20%5C%7D%20%5CvDash%20G%20%5Clor%20H" />

> Nyílván, mert ha az <img src="https://render.githubusercontent.com/render/math?math=F" /> igaz, akkor <img src="https://render.githubusercontent.com/render/math?math=H" /> igaz kell, hogy legyen, ha <img src="https://render.githubusercontent.com/render/math?math=F" /> hamis, akkor <img src="https://render.githubusercontent.com/render/math?math=G" /> igaz kell, hogy legyen.

> Emlékeztető: Logikai következmény jelentése: Bármely értékadás mellett ha a bal oldal igaz (jelen esetben bal oldalon minden igaz, mert egy halmaz áll ott), akkor a jobb is.

##### Rezolvens

Ha <img src="https://render.githubusercontent.com/render/math?math=C" /> és <img src="https://render.githubusercontent.com/render/math?math=D" /> klózok, <img src="https://render.githubusercontent.com/render/math?math=p%20%5Cin%20C" /> és <img src="https://render.githubusercontent.com/render/math?math=%5Cneg%20p%20%5Cin%20D" />, akkor <img src="https://render.githubusercontent.com/render/math?math=C" /> és <img src="https://render.githubusercontent.com/render/math?math=D" /> (<img src="https://render.githubusercontent.com/render/math?math=p" /> menti) rezolvense a <img src="https://render.githubusercontent.com/render/math?math=(C%20-%20%5C%7B%20~%20p%20~%20%5C%7D)%20%5Ccup%20(D%20-%20%5C%7B%20~%20%5Cneg%20p%20~%20%5C%7D)" /> klóz.

> Egy új, harmadik klóz keletkezik.

##### Rezolúciós algoritmus

**Input**: Klózok <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> halmaza.

**Output**: Kielégíthetetlen-e <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />?

**Algoritmus**: Listát vezetünk klózokról. Egy klózt felveszünk, ha 

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-beli, vagy

- két, a listán már szereplő klóz rezolvense.

Ha az <img src="https://render.githubusercontent.com/render/math?math=%5Csquare" /> üres klóz rákerül a listára, a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthetetlen.

Ha már nem tudunk új klózt felvenni és <img src="https://render.githubusercontent.com/render/math?math=%5Csquare" /> nincs köztük, <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthető.

> Kielégíthető formulahalmazra nem feltétlen áll meg az algoritmus. Ezért kérdezzük inkább, hogy kielégíthetetlen-e.

> Egyszerre több literál mentén nem ér rezolválni!!

###### Helyesség

Ha az algoritmus "kielégíthetetlen" válasszal áll meg, akkor az input <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> valóban kielégíthetetlen.

Azt látjuk be, hogy minden klóz, ami a listára kerül, az logikai következménye <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-nak. Ezt indukcióval tesszük: ha a <img src="https://render.githubusercontent.com/render/math?math=C" /> klóz <img src="https://render.githubusercontent.com/render/math?math=n" />. elemként kerül a listára, akkor:

- Ha <img src="https://render.githubusercontent.com/render/math?math=C%20%5Cin%20%5CSigma" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20C" /> mindig teljesül.

- Ha <img src="https://render.githubusercontent.com/render/math?math=C" /> a korábban felvett <img src="https://render.githubusercontent.com/render/math?math=C_1" /> és <img src="https://render.githubusercontent.com/render/math?math=C_2" /> klózok **rezolvense**, akkor
  
  - indukciós feltevés szerint <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20C_1" /> és <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20C_2" />
  
  - tehát <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20%5C%7B%20~%20C_1%2C%20C_2%20~%20%5C%7D" /> (nyílván, összevagyolni ér őket)
  
  - a **rezolúciós következtetés** szerint pedig <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20C_1%2C%20C_2%20~%20%5C%7D%20%5CvDash%20C" /> (rezolúciós rész eleje) (onnan tudjuk, hogy <img src="https://render.githubusercontent.com/render/math?math=C" /> a rezolvense <img src="https://render.githubusercontent.com/render/math?math=C_1" />-nek, és <img src="https://render.githubusercontent.com/render/math?math=C_2" />-nek, hogy ez a feltevés ebben a második esetben)
  
  - így a <img src="https://render.githubusercontent.com/render/math?math=%5CvDash" /> tranzitivitása miatt <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20C" />.

Így tehát ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20%5Csquare" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> valóban kielégíthetetlen, mert kövezketménye a *hamis*. (<img src="https://render.githubusercontent.com/render/math?math=Mod(%5Csquare)%20%3D%20%5Cemptyset" />, nincs őt kielégítő értékadás)

###### Teljesség

Ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthetetlen, akkor az algoritmus mindig a "kielégíthetetlen" válasszal áll meg.

**Minimális kielégíthetetlen részhalmaz**:
A <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthetetlen klózhalmaznak a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%20%5Csubseteq%20%5CSigma" /> egy **minimális kielégíthetetlen részhalmaza**, ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" /> is kielégíthetetlen, de <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" /> bármelyik valódi részhalmaza már kielégíthető. 

**Lineáris rezolúció**:
**Input**: <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> klózhalmaz.
**Output**: Kielégíthetetlen-e <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />?
**Algoritmus**: Listát vezetünk klózokról:

- Az első lépésben felvehetjük <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> **bármelyik elemét**, ez lesz a levezetés **bázisa**.

- Minden további lépésben felvehetjük az előző lépésben felvett klóznak, és egy vagy már a listán szereplő, vagy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-beli klóznak a rezolvensét. Ezt a másik klózt hívjuk ennek a lépésnek az **oldalklózának**.

**Lineáris rezolúció teljessége**:

Ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthetetlen, és <img src="https://render.githubusercontent.com/render/math?math=C%20%5Cin%20%5CSigma" /> benne van a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> egy **minimális kielégíthetetlen részhalmazában**, akkor <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-ból levezethető az üres klóz olyan **lineáris rezolúciós** levezetéssel, melynek **bázisa** <img src="https://render.githubusercontent.com/render/math?math=C" />.

**Bizonyítás**:

Az állítást a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-beli változók <img src="https://render.githubusercontent.com/render/math?math=n" /> száma szerinti indukcióval látjuk be.

- Ha <img src="https://render.githubusercontent.com/render/math?math=n%20%3D%200" />, azaz <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-ban nincs változó, akkor vagy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%3D%20%5C%7B%20%5C%7D" /> (ekkor nincsen benne klóz), vagy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%3D%20%5C%7B%20~%20%5Csquare%20~%20%5C%7D" /> (ekkor van benn egy klóz, az üres klóz)
  
  - A kettő közül <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%3D%20%5C%7B%20~%20%5Csquare%20~%20%5C%7D" /> a kielégíthetetlen.
  
  - Ennek <img src="https://render.githubusercontent.com/render/math?math=%5Csquare" /> az egyetlen eleme, ez egy minimális kielégíthetetlen részhalmazának is eleme.
  
  - Ha felvesszük bázisként, már le is vezettük az üres klózt.

- Ha <img src="https://render.githubusercontent.com/render/math?math=n%20%3E%200" />, akkor vegyünk egy <img src="https://render.githubusercontent.com/render/math?math=C" /> klózt, mely szerepel <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> egy minimális kielégíthetetlen részhalmazában. Legyen ez a részhalmaz <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" />.
  
  - Ha <img src="https://render.githubusercontent.com/render/math?math=C%20%3D%20%5Csquare" />, kész vagyunk: vegyük fel bázisnak.
  
  - Különben legyen <img src="https://render.githubusercontent.com/render/math?math=l%20%5Cin%20C" /> egy <img src="https://render.githubusercontent.com/render/math?math=C" />-beli literál.
  
  - Vegyük észre: minimális kielégíthetetlen részhalmazban nincs pure literál, hiszen ha <img src="https://render.githubusercontent.com/render/math?math=l" /> pure literál lenne, akkor <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-nak egy valódi részhalmaza <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%7C_%7Bl%20%3D%201%7D" /> is kielágíthetetlen lenne. Tehát <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" />-ben <img src="https://render.githubusercontent.com/render/math?math=%5Coverline%7Bl%7D" /> is szerepel valahol.

- Vegyük a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%7C_%7Bl%20%3D%200%7D" /> és <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%7C_%7Bl%20%3D%201%7D" /> klózhalmazokat.

- Mivel <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" /> kielégíthetetlen, ezek is azok.

- Bennük csak legfeljebb <img src="https://render.githubusercontent.com/render/math?math=n%20-%201" /> változó szerepel (mert <img src="https://render.githubusercontent.com/render/math?math=l" /> változója kiesik), így alkalmazhatjuk az indukciós feltevést.

- A <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%7C_%7Bl%3D0%7D" /> klózhalmaznak <img src="https://render.githubusercontent.com/render/math?math=C%20-%20%5C%7B%20~%20l%20~%20%5C%7D" /> is eleme, sőt egy minimális kielégíthetetlen részhalmazának is eleme (mert különben <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%20-%20%5C%7B%20~%20C%20~%20%5C%7D" /> is kielégíthetetlen lenne).

- Tehát <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%7C_%7Bl%20%3D%200%7D" />-ból az indukciós feltevés szerinte van <img src="https://render.githubusercontent.com/render/math?math=%5Csquare" />-nak egy <img src="https://render.githubusercontent.com/render/math?math=C_1%2C%20C_2%2C%20...%2C%20C_m" /> lineáris rezolúciós levezetése, melynek <img src="https://render.githubusercontent.com/render/math?math=C_1%20%3D%20C%20-%20%5C%7B%20~%20l%20~%20%5C%7D" /> a bázisa.

- "Visszaemelve" a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%7C_%7Bl%20%3D%200%7D" /> cáfolatot <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" /> fölötti levezetéssé, az új levezetésben minden klózba bekerül az <img src="https://render.githubusercontent.com/render/math?math=l" /> literál.

- Ez igaz a bázisra, és minden lépésben az eredeti <img src="https://render.githubusercontent.com/render/math?math=C_1" /> és <img src="https://render.githubusercontent.com/render/math?math=C_2" /> klózok rezolvense helyett a <img src="https://render.githubusercontent.com/render/math?math=C%20%5Ccup%20%5C%7B%20~%20l%20~%20%5C%7D" /> és <img src="https://render.githubusercontent.com/render/math?math=C_2" /> vagy <img src="https://render.githubusercontent.com/render/math?math=C_2%20%5Ccup%20%5C%7B%20~%20l%20~%20%5C%7D" /> klózok rezolvensét kapjuk, ami rezolvens, plusz <img src="https://render.githubusercontent.com/render/math?math=l" />

- Tehát a konstrukciónak a végén az <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20l%20~%20%5C%7D" /> egységklóznál jár a lineáris rezolúciós levezetés.

- Mivel <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" /> minimális kielégíthetetlen, kell legyen benne olyan <img src="https://render.githubusercontent.com/render/math?math=C" /> klóz is, mely <img src="https://render.githubusercontent.com/render/math?math=%5Coverline%7Bl%7D" />-t tartalmazza.

- Akkor <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%7C_%7Bl%20%3D%201%7D" />-nek egy minimális kielégíthetetlen részhalmazában szerepel <img src="https://render.githubusercontent.com/render/math?math=C%20-%20%5C%7B%20~%20%5Coverline%7Bl%7D%20~%20%5C%7D" />

- Ebből a klózból indulva az indukciós feltevés szerint van <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%7C_%7Bl%20%3D%201%7D" />-nek lineáris rezolúciós cáfolata

- Az előző fázisban kapott <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20l%20~%20%5C%7D" /> egységklózt tudjuk rezolválni ezzel a <img src="https://render.githubusercontent.com/render/math?math=C" /> klózzal, tehát a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'%7C_%7Bl%20%3D%201%7D" /> cáfolatát "fel tudjuk emelni" <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" /> fölötti levezetéssé.

- A felemelt levezetés végén vagy <img src="https://render.githubusercontent.com/render/math?math=%5Csquare" />-t, vagy <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20%5Coverline%7Bl%7D%20~%20%5C%7D" />-t kapunk. Utóbbi esetben még egyszer rezolválunk <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20l%20~%20%5C%7D" />-lel mint oldalklózzal, és kész vagyunk

### 2. Normálformák az elsőrendű logikában. Egyesítési algoritmus. Következtető módszerek: Alap rezolúció, és elsőrendű rezolúció, ezek helyessége és teljessége.

#### * Elsőrendű logika alapfogalmak

Függvényjelek, predikátumjelek **aritása / rangja**: Hány változósak

**Alapterm**: Olyan term, amiben nincs változó

##### * Struktúra

Egy <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D%20%3D%20(A%2C%20I%2C%20%5Cphi)" /> hármas, ahol

- <img src="https://render.githubusercontent.com/render/math?math=A" /> egy nemüres halmaz, az **univerzum**

- > A változók ebből vehetnek fel értékeket

- <img src="https://render.githubusercontent.com/render/math?math=%5Cphi" /> a változóknak egy "default" **értékadása**, minde <img src="https://render.githubusercontent.com/render/math?math=x" /> változóhoz egy <img src="https://render.githubusercontent.com/render/math?math=%5Cphi(x)%20%5Cin%20A" /> objektumot rendel

- <img src="https://render.githubusercontent.com/render/math?math=I" /> az **interpretációs függvény**, ez rendel a függvény és predikárumjelekhez szemantikát, "értelmet" az adott struktúrában:
  
  - ha <img src="https://render.githubusercontent.com/render/math?math=f%2Fn" /> **függvényjel**, akkor <img src="https://render.githubusercontent.com/render/math?math=I(f)" /> egy <img src="https://render.githubusercontent.com/render/math?math=A%5En%20%5Cto%20A" /> függvény
  
  - > Objektum(ok)ból objektumot csinál
  
  - ha <img src="https://render.githubusercontent.com/render/math?math=p%20%2F%20n" /> **predikátumjel**, akkor <img src="https://render.githubusercontent.com/render/math?math=I(p)" /> egy <img src="https://render.githubusercontent.com/render/math?math=A%5En%20%5Cto%20%5C%7B%20~%200%2C%201%20~%20%5C%7D" /> predikárum
  
  - > Objektum(ok)ból igazságértéket csinál

> Az <img src="https://render.githubusercontent.com/render/math?math=%3D" /> bináris predikátumjelet minden struktúrában ténylegesen az egyenlőséggel kell interpretálnunk!

###### * Term kiértékelése

- Ha <img src="https://render.githubusercontent.com/render/math?math=t%20%3D%20x" /> változó, akkor <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D(t)%20%3A%3D%20%5Cphi(x)" />

- Ha <img src="https://render.githubusercontent.com/render/math?math=t%20%3D%20f(t_1%2C%20...%2C%20t_n)" />, akkor <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D(t)%20%3A%3D%20I(f)(%5Cmathcal%7BA%7D(t_1)%2C%20...%2C%20%5Cmathcal%7BA%7D(t_n))" />

> Emlékeztető, a term lehet egy változó, vagy egy függvény, aminek paraméterei termek.

> Egy struktúra megadásakor **elég csak azon változókat specifikálni**, amik **ténylegesen használtak** (szerepelnek a termekben).

###### * Formulák kiértékelése

<img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D_%7B%5Bx%20~%20%5Cmapsto%20~%20a%5D%7D" />: Az a struktúra, ami az <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D" /> struktúrát úgy változtatja, hogy benne a <img src="https://render.githubusercontent.com/render/math?math=%5Cphi(x)%20%3A%3D%20a" /> 

Ha <img src="https://render.githubusercontent.com/render/math?math=F" /> formula, <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D%20%3D%20(A%2C%20I%2C%20%5Cphi)" /> pedig struktúra, akkor az <img src="https://render.githubusercontent.com/render/math?math=F" /> értéke <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D" />-ban egy igazságérték, amit <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D(F)" /> jelöl, és az <img src="https://render.githubusercontent.com/render/math?math=F" /> felépítése szerinti indukcióval adunk meg:

- Logikai konstansok: <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D(%5Cuparrow)%20%3A%3D%201%2C%20%5Cmathcal%7BA%7D(%5Cdownarrow)%20%3A%3D%200" />

- Konnektívák: <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D(F%20%5Cland%20G)%20%3A%3D%20%5Cmathcal%7BA%7D(F)%20%5Cland%20%5Cmathcal%7BA%7D(G)" />, <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D(F%20%5Clor%20G)%20%3A%3D%20%5Cmathcal%7BA%7D(F)%20%5Clor%20%5Cmathcal%7BA%7D(G)" />, <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D(%5Cneg%20F)%20%3A%3D%20%5Cneg%20%5Cmathcal%7BA%7D(F)" />, ...

- Atomi formulák: <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D(p(t_1%2C%20...%2C%20t_n))%20%3A%3D%20I(p)(%5Cmathcal%7BA%7D(t_1)%2C%20...%2C%20%5Cmathcal%7BA%7D(t_n))" />

> Azaz <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D" />-ban elöször kiértékeljük <img src="https://render.githubusercontent.com/render/math?math=t_1%2C%20...%2C%20t_n" /> termeket, majd a kapott <img src="https://render.githubusercontent.com/render/math?math=a_1%2C%20...%2C%20a_n" /> objektumokat befejettesítjük abba a predikátumba, amit ebben a struktúrában <img src="https://render.githubusercontent.com/render/math?math=p" /> jelöl.

- Kvantorok:
  
  - <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D(%20%5Cexists%20xF)" />: <img src="https://render.githubusercontent.com/render/math?math=1" />, ha van olyan <img src="https://render.githubusercontent.com/render/math?math=a%20%5Cin%20A" />, melyre <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D_%7B%5Bx%20%5Cmapsto%20a%5D%7D%20(F)%20%3D%201" />, különben <img src="https://render.githubusercontent.com/render/math?math=0" />
  
  - <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D(%20%5Cforall%20xF)" />: <img src="https://render.githubusercontent.com/render/math?math=1" />, ha minden <img src="https://render.githubusercontent.com/render/math?math=a%20%5Cin%20A" />-ra igaz, hogy <img src="https://render.githubusercontent.com/render/math?math=%5Cmathcal%7BA%7D_%7B%5Bx%20%5Cmapsto%20a%5D%7D(F)%20%3D%201" />, különben 0

#### Normálformák az elsőrendű logikában

##### Zárt Skolem alak

1. **Nyilak eliminálása** (<img src="https://render.githubusercontent.com/render/math?math=F%20%5Cto%20G%20%5Cequiv%20%5Cneg%20F%20%5Clor%20G" />)

2. **Kiigazítás**: Ne legyen **változónév-ütközés**

3. **Prenex alak**ra hozás: Összes **kvantor előre** kerül

> Idáig volt ekvivalens az átalakítás

1. **Skolem alak**ra hozás: Összes kvantor elöl, és mind <img src="https://render.githubusercontent.com/render/math?math=%5Cforall" />

2. **Lezárás**: Ne maradjon **szabad változó-előfordulás**

###### Kiigazítás

- Különböző helyeken levő kvantorok **különböző változókat kötnek** és

- Nincs olyan változó, mely **szabadon is és kötötten is** előfordul.

> Gyakorlatban annyi ez a lépés, hogy a kötött változókat átnevezzük, jellemzően indexeléssel.

> **Átnevezni csak kötött** változókat ér, szabad változót nem, akkor marad ekvivalens.

###### Prenex alak

Egy formula **Prenex alak**ú, ha <img src="https://render.githubusercontent.com/render/math?math=Q_1x_1Q_2x_2...Q_nx_n(F)" /> alakú, ahol <img src="https://render.githubusercontent.com/render/math?math=F" /> **kvantormentes** formula, és mindegyik <img src="https://render.githubusercontent.com/render/math?math=Q_I" /> egy **kvantor**.

Minden formula ekvivalens Prenex alakra hozható.

Első lépésként **ki kell igazítani a formulát** (előző lépés).

- Ha egy negálást áthúzunk egy kvantoron, megfordul a kvantor: <img src="https://render.githubusercontent.com/render/math?math=%5Cneg%20%5Cexists%20xF%20%5Cequiv%20%5Cforall%20x%20%5Cneg%20F" />

- <img src="https://render.githubusercontent.com/render/math?math=%5Cexists%20x%20F%20%5Clor%20G%20%5Cequiv%20%5Cexists%20x%20(F%20%5Clor%20G)" />
  
  - Ha <img src="https://render.githubusercontent.com/render/math?math=x" /> nem szerepel <img src="https://render.githubusercontent.com/render/math?math=G" />-ben szabadon, ezért kell előtte kiigazírani!

###### Skolem alak

Egy formula **Skolem alakú**, ha <img src="https://render.githubusercontent.com/render/math?math=F%20%3D%20%5Cforall%20x_1%20%5Cforall%20x_2%20...%20%5Cforall%20x_n%20(F%5E*)" />, ahol <img src="https://render.githubusercontent.com/render/math?math=F%5E*" />-ben (a formula magjában) már nincs kvantor.

Skolem alak értelme: <img src="https://render.githubusercontent.com/render/math?math=%5Cforall%20x_1%20...%20%5Cforall%20x_n%20F%5E*%20%5CvDash%20F%5E*%20%5Bx_1%20%2F%20t_1%2C%20...%2C%20x_n%20%2F%20t_n%5D" />

> Tehát termeket lehet a változók helyére helyettesíteni.

A Skolem-alakra hozás **nem ekvivalens, csak s-ekvivalens**: Minden <img src="https://render.githubusercontent.com/render/math?math=F" /> formulához konstruálható eg yolyan <img src="https://render.githubusercontent.com/render/math?math=F'" /> Skolem alakú formula, ami pontosan akkor kielégíthatő, ha <img src="https://render.githubusercontent.com/render/math?math=F" /> is az. Ennek jele: <img src="https://render.githubusercontent.com/render/math?math=F%20%5Cequiv_S%20F'" />

- Prenex alakra hozzuk a formulát

- Skolem-függvényekkel eltűntetjük a <img src="https://render.githubusercontent.com/render/math?math=%5Cexists" /> kvantorokat:
  
  - Minden <img src="https://render.githubusercontent.com/render/math?math=%5Cexists%20y" />-lekötött változót a formula magjában cseréljünk le egy <img src="https://render.githubusercontent.com/render/math?math=f(x_1%2C%20...%2C%20x_n)" /> termre, ahol:
    
    - <img src="https://render.githubusercontent.com/render/math?math=f" /> egy teljesen új függvényszimbólum,
    
    - <img src="https://render.githubusercontent.com/render/math?math=x_1%2C%20...%2C%20x_n" /> pedig az <img src="https://render.githubusercontent.com/render/math?math=y" /> előtt szereplő <img src="https://render.githubusercontent.com/render/math?math=%5Cforall" />-kötött vűétozók.

###### Zárt Skolem alak

- Minden <img src="https://render.githubusercontent.com/render/math?math=x" /> szabad előfordulás helyett egy új <img src="https://render.githubusercontent.com/render/math?math=c_x" /> konstansjelet vezetünk be

- ezt úgy, hogy minden formulában az összes szabad <img src="https://render.githubusercontent.com/render/math?math=x" /> helyére ugyanazt a <img src="https://render.githubusercontent.com/render/math?math=c_x" />-et írjuk

> Ez is s-ekvivalens átalakítás

##### CNF elsőrendű logikában

- **Literál**: Atomi formula (ekkor pozitív), vagy negáltja (ekkor negatív), pl.: <img src="https://render.githubusercontent.com/render/math?math=p(x%2C%20c)%2C%20%5Cneg%20q%20(x%2C%20f(x)%2C%20z)" />

- **Klóz**: Literálok véges diszjunkciója, pl.: <img src="https://render.githubusercontent.com/render/math?math=q(x)%20%5Clor%20%5Cneg%20q%20(x%2C%20c)" />

- **CNF**: Klózok konjukciója, pl.: <img src="https://render.githubusercontent.com/render/math?math=(p(x)%20%5Clor%20%5Cneg%20q(y%2C%20c))%20%5Cland%20%5Cneg%20p(x)" />

**Kvantormentes** elsőrendű logikai formulát az ítéletkalkulusban megszokott módon hozhatunk CNF-re.

#### Alap rezolúció

> Alap, mert alaptermek szerepelnek benne

Input: Elsőrendű formulák egy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> halmaza

Ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthetetlen, akkor az algoritmus ezt véges sok lépésben levezeti

Ha kielégíthető, akkor vagy ezt vezeti le, vagy végtelen ciklusba esik

##### Módszer

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> elemeit zárt Skolem alakra hozzuk, a kapott formulák magját CNF-re.
  
  - Jelölje <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" /> a kapott klóz halmazt

- Ekkor <img src="https://render.githubusercontent.com/render/math?math=E(%5CSigma)'" /> a klózok **alap példányainak halmaza**

> Ez annyit takar, hogy a klózban a változók helyére ízlés szerint alaptermeket helyettesítünk, minden ilyennek a halmaza

- Az <img src="https://render.githubusercontent.com/render/math?math=E(%5CSigma')" /> halmazon futtatjuk az ítéletkalkulus-beli rezolúciós algoritmust

Mivel <img src="https://render.githubusercontent.com/render/math?math=E(%5CSigma')" /> általában végtelen, így az algoritmus (mondjuk)

- Egy lépésben legenerálja, és felveszi <img src="https://render.githubusercontent.com/render/math?math=E(%5CSigma')" /> egy elemét

- az eddigi klózokkal rezolvenst képez, amíg csak lehet

- ha közben megkapjuk az üres klózt, <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthetetlen

- különben generáljuk a következő elemet.

##### Helyesség, és teljesség

- A zárt Skolem alakra hozás s-ekvivalens átalakítás, tehát <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> pontosan akkor kielégíthetetlen, ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" /> az

- A Herbrand-tétel következménye szerint <img src="https://render.githubusercontent.com/render/math?math=%5CSigma'" /> pontosan akkor kielégíthetetlen, ha <img src="https://render.githubusercontent.com/render/math?math=E(%5CSigma')" /> az

> Mert a Herbrand-kiterjesztés s-ekvivalens transzformáció

- Az ítéletkalkulus kompaktsági tétele szerint <img src="https://render.githubusercontent.com/render/math?math=E(%5CSigma')" /> pontosan akkor kielégíthetetlen, ha van egy véges <img src="https://render.githubusercontent.com/render/math?math=%5CSigma_0" /> kielégíthetetlen részhalmaza

> Azaz elég véges sokat legyártani

- A rezolúciós algoritmus teljessége szerinte ha a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma_0" /> véges klózhalmaz kielégíthetetlen, akkor az algoritmus ezt levezeti

- Tehát ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthetetlen, akko az aalgoritmus leáll ezzel a válasszal akkor, amikor egy ilyen <img src="https://render.githubusercontent.com/render/math?math=%5CSigma_0" /> halmaznak már legenerálta az összes elemét (és rezolvenseit, köztük <img src="https://render.githubusercontent.com/render/math?math=%5Csquare" />-t) 

> Az alap rezolúcióval az lehet a probléma, hogy nagy a keresési tere azáltal, hogy a változókat alaptermekkel helyettesítgetjük

#### Elsőrendű rezolúció

##### Elsőrendű rezolvensképzés

Két elsőrendű logikai klóz, <img src="https://render.githubusercontent.com/render/math?math=C_1" /> és <img src="https://render.githubusercontent.com/render/math?math=C_2" /> elsőrendű rezolvensét így kapjuk:

- Átnevezzük a klózokban a változókat úgy (legyenek a változóátnevezések <img src="https://render.githubusercontent.com/render/math?math=s_1" /> és <img src="https://render.githubusercontent.com/render/math?math=s_2" />), hogy a kapott <img src="https://render.githubusercontent.com/render/math?math=C_1%20%5Ccdot%20s_1" /> és <img src="https://render.githubusercontent.com/render/math?math=C_2%20%5Ccdot%20s_2" /> klózok ne tartalmazzanak közös változót.

- Kiválasztunk <img src="https://render.githubusercontent.com/render/math?math=C_1%20%5Ccdot%20s_1" />-ből <img src="https://render.githubusercontent.com/render/math?math=l_1%2C%20...%2C%20l_m" />és <img src="https://render.githubusercontent.com/render/math?math=C_2%20%5Ccdot%20s_2" />-ből <img src="https://render.githubusercontent.com/render/math?math=l_1'%2C%20...%2C%20l_n'" /> literálokat, mindkettőből legalább egyet-egyet.

- Futtatjuk az egyesítési algoritmust a <img src="https://render.githubusercontent.com/render/math?math=C%20%3D%20%5C%7B%20~%20l_1%2C%20...%2C%20l_m%2C%20l_1'%2C%20...%2C%20l_n'%20~%20%5C%7D" /> klózon.

> Emiatt az egyesítési lépés miatt a korábbi literál kiválasztást érdemes úgy csinálni, hogy csak egy féle predikátumjeleket választunk ki, és az egyik klózból csak pozitív előfordulásokat, a másikból csak negatívakat. Így lesz esély arra, hogy egyesíthető legyen.

- Ha <img src="https://render.githubusercontent.com/render/math?math=C" /> egyesíthető az <img src="https://render.githubusercontent.com/render/math?math=s" /> legáltalánosabb egyesítővel, akkor <img src="https://render.githubusercontent.com/render/math?math=s" />-et végrehajtjuk a nem kiválasztott literálok halmazán: <img src="https://render.githubusercontent.com/render/math?math=R%20%3A%3D%20((C%20%5Ccdot%20s_1%20-%20%5C%7B%20~%20l_1%2C%20...%2C%20l_m%20~%20%5C%7D)%20%5Ccup%20(C_2%20%5Ccdot%20s_2%20-%20%5C%7B%20~%20l_1'%2C%20...%2C%20l_n'%20~%20%5C%7D))%20%5Ccdot%20s" />

A kapott <img src="https://render.githubusercontent.com/render/math?math=R" /> klóz a <img src="https://render.githubusercontent.com/render/math?math=C_1" /> és <img src="https://render.githubusercontent.com/render/math?math=C_2" /> egy elsőrendű rezolvense.

##### Algoritmus

**Input**: Elsőrendű klózok egy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> halmaza. Úgy tekintjük, mintha a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-beli klózok változói univerzálisan lennének kvantálva.

> Atért tekinthetjük így, mert <img src="https://render.githubusercontent.com/render/math?math=%5Cforall%20x%20(F%20%5Cland%20G)%20%5Cequiv%20%5Cforall%20F%20%5Cland%20%5Cforall%20G" />

**Output**:

- Ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma%20%5CvDash%20%5Cdownarrow" />, akkor "kielégíthetetlen"

- Különben "kielégíthető", vagy végtelen cikus

Listát vezetünk klózokról, egy klózt felveszünk, ha

- <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-beli, vagy

- két, már a listán szereplő klóz rezolvense.

Ha <img src="https://render.githubusercontent.com/render/math?math=%5Csquare" /> rálerül a listára, akkor <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthetetlen.

Különben, ha már nem tudunk több klózt lebezetni, <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthető.

> <img src="https://render.githubusercontent.com/render/math?math=Res(%5CSigma)" /> jelöli azt a halmazt, amely tartalmazza <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> elemeit, és a belőlök egy rezolvensképzéssel levezethető klózokat.

> <img src="https://render.githubusercontent.com/render/math?math=Res%5E*(%5CSigma)" /> pedig a <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-ból rezolúcióval levezethető összes klóz halmazát jelöli.

##### Helyesség

- A helyesség a rezolvensképzés helyességéből következik

- Mivel a klózik univerzálisan kvantáltak (a Skolem alakból), így tetszőleges <img src="https://render.githubusercontent.com/render/math?math=C" /> klózra, és <img src="https://render.githubusercontent.com/render/math?math=s" /> helyettesítésre <img src="https://render.githubusercontent.com/render/math?math=C%20%5CvDash%20C%20%5Ccdot%20s" />

- Tehát a rezolvensképzésnél felírt <img src="https://render.githubusercontent.com/render/math?math=C_1" />-nek <img src="https://render.githubusercontent.com/render/math?math=C_1%20%5Ccdot%20s_1%20%5Ccdot%20s" />, <img src="https://render.githubusercontent.com/render/math?math=C_2" />-nek pedig <img src="https://render.githubusercontent.com/render/math?math=C_2%20%5Ccdot%20s_2%20%5Ccdot%20s" /> egy-egy logikai következménye

- Tehát <img src="https://render.githubusercontent.com/render/math?math=%5C%7B%20~%20C_1%2C%20C_2%20~%20%5C%7D%20%5CvDash%20%5C%7B%20~%20C_1s_1s%2C%20C_2s_2s%20~%20%5C%7D" />

- Ennek a két klóznak pedig a rezolvens következménye (az "eredeti" rezolúciós következtetés szerint)

##### Teljesség

- A teljességi irányhoz felhasználjuk az alap rezolúció teljességét

- Tehát: Ha <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" /> kielégíthetetlen, akkor az üres klóznak van egy <img src="https://render.githubusercontent.com/render/math?math=C_1'%2C%20C_2'%2C%20...%2C%20C_n'%20%3D%20%5Csquare" /> alaprezolúciós levezetése.

- Ebből az alaprezolúciós levezetésből fogunk készíteni egy <img src="https://render.githubusercontent.com/render/math?math=C_1%2C%20C_2%2C%20...%2C%20C_n" /> elsőrendű rezolúciós levezetést.

- A klózokat úgy fogjuk elkészíteni indukcióval <img src="https://render.githubusercontent.com/render/math?math=n" /> szerint, hogy minden <img src="https://render.githubusercontent.com/render/math?math=i" />-re a <img src="https://render.githubusercontent.com/render/math?math=C_i" />-nek a <img src="https://render.githubusercontent.com/render/math?math=C_i'" /> egy (alap) példánya lesz.
  
  - Ha <img src="https://render.githubusercontent.com/render/math?math=C_i'%20%5Cin%20E(%5CSigma)" />, azaz <img src="https://render.githubusercontent.com/render/math?math=C_i'" /> egy <img src="https://render.githubusercontent.com/render/math?math=%5CSigma" />-beli <img src="https://render.githubusercontent.com/render/math?math=C" /> klóz (alap) példánya, akkor legyen <img src="https://render.githubusercontent.com/render/math?math=C_i%20%3A%3D%20C" />
  
  - A másik lehetőség, hogy <img src="https://render.githubusercontent.com/render/math?math=C_i'" /> a <img src="https://render.githubusercontent.com/render/math?math=C_j'" /> és <img src="https://render.githubusercontent.com/render/math?math=C_k'" /> klózok, <img src="https://render.githubusercontent.com/render/math?math=j%2C%20k%20%3C%20i" />, egy rezolvense.
    
    - Ennek az esetnek a belátásához felítjuk az ún. lift lemmát:
    
    - Ha <img src="https://render.githubusercontent.com/render/math?math=C_1" />-nek <img src="https://render.githubusercontent.com/render/math?math=C_1'" />, <img src="https://render.githubusercontent.com/render/math?math=C_2" />-nek pedig <img src="https://render.githubusercontent.com/render/math?math=C_2'" /> alap példányai, melyeknek <img src="https://render.githubusercontent.com/render/math?math=R'" /> rezolvense, akkor van <img src="https://render.githubusercontent.com/render/math?math=C_1" />-nek, és <img src="https://render.githubusercontent.com/render/math?math=C_2" />-nek olyan elsőrendű <img src="https://render.githubusercontent.com/render/math?math=R" /> rezolvense, melynek <img src="https://render.githubusercontent.com/render/math?math=R'" /> alap példánya.

> Lift lemma bizonyítása kell?

- Mivel a <img src="https://render.githubusercontent.com/render/math?math=C_n'%20%3D%20%5Csquare" /> üres klóz csak önmagának példánya, így <img src="https://render.githubusercontent.com/render/math?math=C_n%20%3D%20%5Csquare" /> kell legyen.
