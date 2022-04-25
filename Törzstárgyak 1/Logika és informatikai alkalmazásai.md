## Logika és informatikai alkalmazásai

### 1. Normálformák az ítéletkalkulusban, Boole-függvények teljes rendszerei. Következtető módszerek: Hilbert-kalkulus és rezolúció, ezek helyessége és teljessége.

#### Normálformák az ítéletkalkulusban

##### * Ítéletkalkulus-beli formulák

- Minden **változó**, és minden **logikai konstans** formula

- Ha $F$ formula, akkor $( \neg F )$ is formula

- Ha $F$ és $G$ formulák, akkor $(F \land G), (F \lor G), (F \leftrightarrow G)$ is formulák

- **Más formula nincs**

##### Konjunktív normálforma (CNF)

- **Literál**: CNF legkisebb eleme, lehet egy **válzotó**, vagy egy **változó negáltja**.
  
  - **Negatív literál**: Ha egy változó negáltja alkotja.
  
  - **Pozitív literál**: Ha egy nem negált változó alkotja.

- **Klóz**: Véges sok **literál diszjunkciója** (vagyolása).
  
  - **Egységklóz**: 1db változóból álló klóz.
  
  - **Üres klóz**: 0db változóból álló klóz.
    
    - Értéke minden értékadás mellett **hamis**.
    
    - Jele: $\square$

- **CNF**: **Klózok konjunkciója** (éselése).
  
  - **Üres CNF**: 0db klózt tartalmaz.
    
    - Értéke minden értékadás mellett **igaz**.
    
    - Jele: $\emptyset$

> Üres klóz az inputban jellemzően nincs, de az algoritmusok generálhatnak.

###### Minden formula ekvivalens CNF alakra hozható.

1. $\to$ és $\leftrightarrow$ konnektívák eliminálása.

2. $\neg$-k bevitele változók mellé deMorgan azonosságokkal.

3. $\lor$ jelek bevitele a $\land$ jelek alá disztributivitás alkalmazásával.

> Disztributivitás szabályai:
> $F \lor (G \land H) \equiv (F \lor G) \land (F \lor H)$
> $(F \land G) \lor H \equiv (F \lor H) \land (G \lor H)$

> A "konnektíva" azt jelenti, hogy az operátor formulákat vár (köt össze), nem változókat (az a Boole-függvény).

###### CNF-ek reprezentálása

Nem stringként, hanem:

- egy klózt a benne szereplő literálok halmazaként,

- egy CNF-et pedig a klózainak halmazaként.

> Ezt azért tehetjük meg, mert sem a vagyolás, sem az éselés esetén nem számít a sorrend, illetve az érintett változók multiplicitása sem, pl. $(p \lor p) \land (q \lor q)$ ugyan az, mint $q \lor p$ (sorrend fordult, multiplicitás eltűnt).

##### Diszjunktív normálforma

Ugyan az, mint a CNF, csak nem "vagyolások éselése", hanem "éselések vagyolása".

##### Negációs normálforma

Ha $\neg$ csak változó előtt szerepel, és $\neg$-en kívül csak $\lor$ és $\land$ szerepel.

> Ilyet kapunk ha a CNF-re hozást csak a 2. lépésig csináljuk.

#### Boole-függvények teljes rendszerei

##### * Boole függvény ($n$-változós)

Bitvektort egy bitbe képező függvény: $f: \{ ~ 0, 1 ~ \}^n \to \{ ~ 0, 1 ~ \}$

$f$ egy $n$-változós függvény jelölése: $f / n$

A $\neg$ unáris, egyváltozós Boole-függvény

A többi 4 megadható 4 soros igazságtáblával.

##### * Indukált Boole-függvény

Ha az $F$ formulában csak a $\{ ~ p_1, ..., p_n ~ \}$ változók szerepelnek, akkor $F$ indukál egy $n$-változós Boole-függvényt, melyet szintén $F$-el jelölünk:

- $p_i(x_1, ..., x_n)  := x_i$ (ez **projekció** / tömbelem kiválasztás)

- $(\neg F)(x_1, ..., x_n) := \neg (F(x_1, ..., x_n))$

- $(F \lor G)(x_1, ..., x_n) := F(x_1, ..., x_n) \lor G(x_1, ..., x_n)$

- ...

> A Boole-függvénynek átadott bitvektor tulajdonképpen a formula egy értékadása. A visszaadott bit pedig a formula kiértékelésének eredménye.

##### * Boole-függvények megszorítása

Legyen $f/n$ a Boole-függvény, $n > 0$. Ha $b \in \{ ~ 0, 1 ~ \}$ igazságérték, úgy $f|_{x_n=b}$ jelöli azt az $(n - 1)$ változós Boole-függvényt, melyet úgy kapunk, hogy $f$ inputjában $x_n$ értékét rögzítjük $b$-re.

Azaz: $f|_{x_n = b}(x_1, ..., x_{n-1}) := f(x_1, ..., x_{n-1}, b)$

Például:

- $\lor |_{x_2 = 1}$ a konstans 1 függvény.

- $\land |_{x_2 = 0}$ a konstans 0 függvény.

> Bármenyik koordinátát lehet rögzíteni, nem csak az utolsót.

##### Teljes rendszerek

Boole-függvények egy $H$ rendszere teljes, vagy adekvált, ha minden $n$-változós Boole-függvény előáll

- a **projekcióból**

- és $H$ elemeiből

- alkalmas **kompozícióval**.

###### Kompozíció

Ha $f/n$ és $g_1/k, ..., g_n/k$ Boole-függvények, akkor az $f \circ \lang g_1, ..., g_n \rang$ az a $k$-változós Boole-függvény, melyre: $(f \circ \lang g_1, ..., g_n \rang)(x_1, ..., x_n) = f(g_1(x_1, ..., x_k), ..., g_n(x_1, ..., x_k))$

> Azaz egy függvényt úgy hívunk meg, hogy az inputjai függvényhívások eredményei.

##### Shannon expanzió

$f(x_1, ..., x_n) = (x_n \land f |_{x_n = 1}(x_1, ..., x_{n-1})) \lor ( \neg x_n \land f |_{x_n = 0}(x_1, ..., x_{n-1}))$

> Lényegében ezzel azt írtuk le, hogy az $x_n$ értéke vagy úgy igaz a formula, hogy $x_n = 1$, vagy úgy, hogy $x_n = 0$.

Ennek a következménye: Minden Boole függvény előáll a projekciók, és a $\{ ~ \neg, \land, \lor ~ \}$ alkalmas kompozíciójaként. (Hiszen az előző összefüggésben csak ezeket használjuk fel, és ez ismételhető amíg nem kötöttünk le minden változót.)

Ezt úgy is lehet mondani, hogy a $\{ ~ \neg, \lor, \land ~ \}$ **rendszer teljes**.

Ebből az is következik, hogy minden Boole-függvény indukálható olyan formulával, melyben csak a $\{ ~ \neg, \land, \lor ~ \}$ konnektívák szerepelnek.

##### További teljes rendszerek

- $\{ ~ \neg, \land ~ \}$: Mivel $x_1 \land x_1 = \neg (\neg x_1 \lor \neg x_2)$

- $\{ ~ \to, \downarrow ~ \}$ `// Hilbert rendszere`

- $\{ ~ \text{NAND} ~ \}$

- $\{ ~ \text{NOR} ~ \}$

> A NAND-on, és NOR-on kívül nincs másik olyan $f/2$ Boole-függvény, ami egyedül is teljes rendszert alkot.

#### Hilbert rendszere

Egy input $\Sigma$ **formulahalmaz** összes következményét (és csak a következményeket) lehet vele levezetni.

Az ítéletváltozókon kívül ebben a rendszerben csak a $\to$ konnektívát, és a $\downarrow$ logikai konstanst használhatjuk.

> Minden formula ilyan alakra hozható, mert $\{ ~ \to, \downarrow ~ \}$ teljes rendszer.

##### A Hilbert rendszer axiómái

- $(F \to (G \to H)) \to ((F \to G) \to (F \to H))$

- $F \to (G \to F)$

- $((F \to \downarrow )\to \downarrow) \to F$

> EZen a formulák **tautológiák**. Azaz minden értékadás mellett igazak.

##### Az axiómák példányai

A 3 axióma egy **példánya**: valamelyik axiómában szereplő $F, G, H$ helyére **tetszőleges formulát** írunk.

Ennek van jelölése is: Ha $F$ egy formula, melyben a $p_1, ..., p_n$ változók szerepelnek, és $F_1, ..., F_n$ formulák, akkor $F[p_1/F_1, ..., p_n/F_n]$ jelöli azt a formulát, melyet úgy kapunk $F$-ből, hogy benne minden $p_i$ helyére az $F_i$ formulát írjuk.

##### Leválasztási következtetés, avagy modus ponens

$\{ ~ F, F \to G ~ \} \vDash G$

> Ha $F$-et, és $F \to G$-t már levezettük, azaz az eredeti formulánknak ők logikai következményei, akkor felvehetjük $G$-t is, mert ő is logikai következmény.

##### Levezetés Hilbert rendszerében

Legyen $\Sigma$ formulák egy halmaza, $F$ pedig egy formula. Azt mondjuk, hogy $F$ **levezethető** $\Sigma$-ból **Hilbert rendszerében**, jelben $\Sigma \vdash F$, ha van olyan $F_1, F_1, ..., F_n$ formula-sorozat, melynek minden eleme

- $\Sigma$-beli vagy

- **axiómapéldány** vagy

- előáll két korábbiból **modus ponenssel**

és melyre $F_n = F$. (Ha $\Sigma$ üres, akkor $\emptyset \vdash F$ helyett $\vdash F$-et is írhatunk) 

##### Helyesség, teljesség

###### Tautológia példányai is tautológiák

Tehát a Hilbert-rendszer **axióma-példányai tautológiák**.

Ez egy általánosabb összefüggés következménye:

Legyenek az $F$ formulában szereplő változók $p_1, ..., p_n$, és $F_1, ..., F_n$ további formulák (melyekben más változók is előfordulhatnak).
Legyen $\mathcal{A}$ egy tetszőleges értékadás.
Definiáljuk $\mathcal{B}$ értékadást a következőképpen: $\mathcal{B}(p_i) := \mathcal{A}(F_i)$
(a $p_i$ értéke $\mathcal{B}$-ben legyen az az érték, ami $F_i$ értéke $\mathcal{A}$-ban)
Ekkor: $\mathcal{B}(F) = \mathcal{A}(F[p_1/F_1, ..., p_n/F_n])$

###### Helyesség

Ha $\Sigma \vdash F$, akkor $\Sigma \vDash F$.

> Azaz, ha egy formulát le lehet vezetni $\Sigma$-ból Hilbert rendszerében, akkor az következménye is $\Sigma$-nak.

**Bizonyítás**:

- Legyen $F_1, ..., F_n$ egy $\Sigma$ fölötti levezetése $F$-nek. Teljes indukcióval megmutatjuk, hogy minden $i$-re $\Sigma \vDash F_i$

- Ha $F_i \in \Sigma$, akkor $\Sigma \vDash F_i$

- Ha $F_i$ axiómapéldány, akkor $\emptyset \vDash F_i$ (tautológiák minden elméletben szerepelnek, és az axiómapéldányok a korábbi szabály miatt tautológiák), így a monotonitás miatt $\Sigma \vDash F_i$ is igaz (nyílván ha az $\emptyset$-nak következménye, akkor egy bővebb halmaznak, a $\Sigma$-nak is).

- Ha pedig $F_i = MP(F_j, F_k)$ a $j, k < i$ indexekre, akkor
  
  - Az indukciós feltevés szerint $\Sigma \vDash F_j$ és $\Sigma \vDash F_k$ (feltételezzük, hogy a korábban felvett formulák már logikai következmények)
  
  - Tehát $\Sigma \vDash \{ ~ F_j, F_k ~ \}$
  
  - MP def miatt $F_k = F_j \to F_i: \Sigma \vDash \{ ~ F_j, F_j \to F_i ~ \}$
  
  - A leválasztási következtetés: $\{ ~ F_j, F_j \to F_i ~ \} \vDash F_i$
  
  - A tranzitivitás miatt tehát $\Sigma \vDash F_i$ (tranzitivitást kihasználjuk, mivel $\Sigma \vDash { ~ F_j, F_j \to F_i ~ } \vDash F_i$)

Így a **Hilbert-rendszer egy helyes következtető rendszer**.

###### Teljesség

TODO

#### Rezolúció

TODO

### 2. Normálformák az elsőrendű logikában. Egyesítési algoritmus. Következtető módszerek: Alap rezolúció, és elsőrendű rezolúció, ezek helyessége és teljessége.
