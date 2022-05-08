## Közelítő és szimbolikus számítások

> Numerikus stabilitás jelentése: A függvény argumantumainak megváltozása meggkora eltérést eredményez a függvényértékben. Ha nagyot akkor numerikusan nem stabilis.

### 1. Eliminációs módszerek, mátrixok trianguláris felbontásai. Lineáris egyenletrendszerek megoldása iterációs módszerekkel. Mátrixok sajátértékeinek, és sajátvektorainak numerikus meghatározása.

#### Eliminációs módszerek

$$
\begin{align}
    a_{11}x_1 + a_{12}x_2 + ... + a_{1n}x_n & = b_1\\
    a_{21}x_1 + a_{22}x_2 + ... + a_{2n}x_n & = b_2\\
                                            & ~  ...\\
    a_{n1}x_1 + a_{n2}x_2 + ... + a_{nn}x_n & = b_n\\
\end{align}
$$

Tegyük fel, hogy $A \in \mathbb{C}^{n \times n}$, és $b \in \mathbb{C}^n$. Az $Ax = b$ lineáris egyenletrendszernek pontosan akkor van egyetlen megoldása, ha $A$ nem szinguláris (azaz $detA \ne 0$). Ekkor a megoldás $x = A^{-1} b$. A megoldás $i$. komponensét megadja a Cramer szabály is:

$$
x_i = \frac{det A^{(i)}}{detA}
$$

> $A^{(i)}$ mátrixot úgy kapjuk, hogy az $A$ mátrix $i$. oszlopát kicseréljük a $b$ vektorral.

> Gyakorlatban ez a tétel nem használatos, mert az inverz számolás nagy műveletigényű lehet, a Cramer szabály pedig numerikusan nem stabilis.

##### Lineáris egyenletrendszerek megoldási módjai

- Direkt módszerek: Véges sok, meghatározott számú lépésben megtalálják a megoldást.

- Iterációs módszerek: Minden iterációs lépésben jobb és jobb közelítést adják a megoldásnak.
  
  - Magát a megoldást általában nem érik el véges lépésben.

##### Egyenletrendszerek ekvivalenciája

Két egyenletrendszert akkor tekintünk ekvivalensnek, ha a megoldásaik halmaza megegyezik.

Megengedett transzformációk:

- Egy egyenletnek egy nem nulla számmal való beszorzássa.

- Egy egyenlet konstansszorosának hozzáadása egy másik egyenlethez.

##### Egyenletrendszerek megoldása

Ilyen átalakításokkal próbálunk háromszögmátrixot vagy diagonális mátrixot létrehozni. Ez azért jó, mert ilyen alakban az egyenletrendszer könnyen megoldható:

$$
\begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33} \\
\end{bmatrix}

\begin{bmatrix}
x_1 \\
x_2 \\
x_3 \\
\end{bmatrix}

=

\begin{bmatrix}
b_1 \\
b_2 \\
b_3 \\
\end{bmatrix}
$$

Ilyen az esetben a megoldás könnyen kifejezhető:

$$
\begin{align}
x_3 & = \frac{b_3}{u_{33}} \\
\\
x_2 & = \frac{b_2 - u_{23}x_3}{u_{22}} \\
\\
x_1 & = \frac{b_1 - u_{12}x_2 - u_{13}x_3}{u_{11}}
\end{align}
$$

###### Matlab program

A fentebbi példa módszerének altalánosítása felső trianguláris mátrixokra.

```matlab
function x = UTriSol(U, b)
n = length(b);
x = zeros(n, 1);
for j = n : -1 : 2
    x(j) = b(j) / U(j, j);
    b(1:j - 1) = b(1:j - 1) - x(j) * U(1:j - 1, j);
end
x(1) = b(1) / U(1, 1);
```

> Műveletigénye $O(\frac{n^2}{2})$

##### Eliminációs mátrix

 A $G_j \in \mathcal{R}^{n \times n}$ **eliminációs mátrix**, ha felírható $G_j = I + g^{(j)}e_j^T$ alakban valamely $1 \le j \le n$-re egy olyan $g^{(j)}$ vektorral, amelynek $j$-dik komponense, $g_j^{(j)} = 0$

###### Példa

$$
j = 3; G_j =
\begin{bmatrix}
1 & 0 & 2 \\
0 & 1 & 3 \\
0 & 0 & 1 \\
\end{bmatrix}

$$

$j = 3$ a mátrix 3. oszlopában látszódik is, csak ott tér el egy egységmátrixtól.

$G_j$ komponensei:

$$
g^{(j)} = 
\begin{bmatrix}
2 \\
3 \\
0 \\
\end{bmatrix} ;
e_j^T =
\begin{bmatrix}
~ 0 ~ 0 ~ 1 ~ \\
\end{bmatrix}
$$

$j = 3$ miatt a $g^{(j)}$ harmadik sora nulla, illetve az $e_j^T$ harmadik koordinátája is nulla.

###### Eliminációs mártix jelentősége

Egy $A \in \mathcal{n \times n}$ mátrixot a $G_j = I + g^{(j)}e_j^T$ eliminációs mátrixszal balról szorozva a $B = G_jA$ szorzatmátrix úgy áll elő, hogy $A$ $1, 2, ..., n$-dik sorához rendre hozzáadjuk $A$ $j$-dik sorának $g_1^j, g_2^j, ..., g_3^j$-szeresét.

Például a következő mátrixok esetén:

$$
A = 
\begin{bmatrix}
1 & 2 & 4 \\
6 & 8 & 2 \\
9 & 1 & 0 \\
\end{bmatrix}

G_j = 
\begin{bmatrix}
1 & 0 & 2 \\
0 & 1 & 3 \\
0 & 0 & 1 \\
\end{bmatrix}

$$

Az eredmény:

$$
G_jA = 
\begin{bmatrix}
19 & 4 & 4 \\
33 & 11 & 2 \\
9 & 1 & 0 \\
\end{bmatrix}
$$

Az $A$ mátrix első sorához valóban kétszer a másodikhoz háromszor a harmadikhoz pedig nullaszor lett hozzáadva az $A$ mátrix harmadik sora.

Könnyen megadható olyan eliminációs mátrix, amivel egyadott oszlop (vagy egy önálló vektor) **egy adott koordináta alatti elemei kinullázhatóak**, például a fentebbi $A$ mátrixhoz ($a_{11}-et$ módosítottam $2$-re, hogy szemléletesebb legyen a példa):

$$
\begin{bmatrix}
1 & 0 & 0 \\
-3 & 1 & 0 \\
-\frac{9}{2} & 0 & 1 \\
\end{bmatrix}

\begin{bmatrix}
2 & 2 & 4 \\
6 & 8 & 2 \\
9 & 1 & 0 \\
\end{bmatrix}

=

\begin{bmatrix}
2 & 2 & 4 \\
0 & 2 & -10 \\
0 & -8 & -18 \\
\end{bmatrix}
$$

Az első oszlopban ténylegesen kinullázódott két sor, már csak a második oszlopban kellene az utolsó sort kinullázni, és egy könnyen megoldható egyenletrendszer együtthatómátrixát kapnánk.

#### Mátrixok trianguláris felbontásai

##### LU felbontás

Át akarjuk alakítani az $Ax = b$ egyenletrendszert úgy, hogy a bal oldalon háromszögmátrix szerepeljen.

Ezt valamennyi eliminációs mátrix sorozatával meg tudjuk tenni:

$MAx = M_{n - 1} ... M_1A_x = M_{n-1} ... M_1 b = Mb$

> Hasonló felbontás megkezdése történt az előző példában.

Ekkor $L = M^{-1}$, $U = MA$

> Könnyű számolni, mert az eliminációs mátrix inverze úgy számolható, hogy a főátlón kívüli elemeket negáljuk.

###### Egyenletrendszer megoldása LU felbontással

$Ax = b$ helyett az $LUx = b$ egyenletrendszert oldhatjuk meg. Ezt **két lépésben** elvégezve végig háromszögmátrixokkal dolgozhatunk.

Ezzel megkaptuk a **Gauss-elimináció** módszerét:

1. Az $A$ mátrix $LU$ felbontása

2. $Ly = b$ megoldása $y$-ra (az $y$ egy új, mesterséges változó)

3. $Ux = y$ megoldása $x$-re

```matlab
[L, U] = LU(A);
y = LTriSol(L, b);
x = UTriSol(U, y);
```

###### * LU felbontás Matlabban

```matlab
function [L, U] = LU(A)
[m, n] = size(A);
for k = 1:n-1
    A(k+1:n, k) = A(k+1:n, k) / A(k, k);
    A(k+1:n, k+1:n) = A(k+1:n, k+1:n) - A(k+1_n, k) * A(k, k+1_n);
end
L = eye(n, n) + tril(A, -1);
U = triu(A);
```

###### Főelemkiválasztás

Az LU felbontás csak akkor sikeres, ha az $A$ mátrix nem szinguláris, és minden generáló elem (főátló-beli elemek) nullától különböző (mivel azokkal leosztunk). Ha az utóbbi nem teljesül, még lehet, hogy van felbontás, átrendezéssel, ami ekvivalens feladatot eredményez. Ezt az eljárást főelemkiválasztásnak hívjuk.

Ezeket a sorcseréket egy **permutációs mátrixszal** való beszorzással végezzük.

A $P_{ij}$ permutációs mátrix egy egységmátrix, melyben az $i$-edik, és $j$-edik sor fel van cserélve. Dimenziószáma megegyezik a "permutálandó" mátrixéval.

Az $A$ mátrixot ezzel a $P_{ij}$-vel balról szorozva egy olyan mátrixot kapunk, ami az $A$ mátrix, melyben az $i$-edik, és $j$-edik sor fel van cserélve.

Jobbról szorozva az oszlopok cserélődnek.

##### Cholesky felbontás

**Rirka mátrixok** esetén hatékonyabb, mint a Gauss-elimináció.

Ha az $A$ mátrix szimmetrikus, és pozitív definit, akkor az LU felbontás $U = L^T$ alakban létezik, tehát $A = LL^T$, ahol $L$ alsó háromszögmátrix, amelynek diagonális elemei pozitív számok. Az ilyen felbontást **Cholesky-felbontásnak** hívjuk.

> Pozitív definit = minden sajátértéke pozitív

###### Matlab implementáció

```matlab
function [x] = LGPD(A, b);
R = chol(A);
y = R' \ b;
x = R \ y;
```

> A `'` operátor transzponál, a `\` pedig: `1R \ y := Az Rx = y egyenletrendszer megoldása`

A Cholesky felbontás numerikusan stabilis, műveletigénye $ \frac{1}{3} n^3 + O(n^2)$. Feleannyi, mint egy általános mátrix LU felbontásáé.

##### QR ortogonális felbontás

Egy $Q$ négyzetes mátrix ortogonális, ha $QQ^T = Q^TQ = I$.

Az ortogonális transzformációk megtartják a kettes normát, így numerikusan stabilisak.

Lineáris egyenletrendszer megoldása az $A = QR$ felbontással:

$$
Rx = Q^Tb
$$

Matlabban

```matlab
[Q, R] = qr(A, 0);
x = R \ (Q' * b);
```

Tetszőleges $A$ négyzetes valós reguláris mátrixnak létezik az $A = QR$ felbontása ortogonális és felső háromszögmátrixra.

#### Lineáris egyenletrendszerek megoldása iterációs módszerekkel

A korábbi megoldási módok **direkt módszerek voltak**, véges lépésben megtalálták a megoldást. A következőek iterációs módszerek, minden iterációban egyre jobb közelítéseket adnak, de általában véges lépésben nem találják meg a megoldást. Mégis nagyobb méterű, sűrűbb mátrixok esetén előnyös a használatuk.

##### Jacobi iteráció

> Nem minden esetben konvergál a jacobi iteráció! (A megoldás felé)

A módszer:

1. Felírjuk az egyenleteket olyan formában, hogy a bal oldalra rendezünk 1-1 változót.

2. Választunk egy kiindulási $x_0$ vektort.

3. Elkezdjük az iterációt, mindig a megkapott értékeket behelyettesítjük a kifejezett báltozó jobb oldalába (nulladik iterációban $x_0$-t).

4. Ezt addig ismételgethetjük, amíg az eltérés két eredmény között megfelelően kicsi.

###### Példa

$$
\begin{align}
-2x_1 + x_2 + 5x_3  & = 4 \\
\\
4x_1 - x_2 + x_3 & = 4 \\
\\
2x_1 - 4x_2 + x_3 & = -1
\end{align}
$$

Ehhez tartozó **iterációs egyenletek**:

$$
\begin{align}
x_1 & = \frac{-4 + x_2 + 5x_3}{2} \\
\\
x_2 & = -4 + 4x_1 + x_3 \\
\\
x_3 & = -1 - 2x_1 + 4x_2
\end{align}
$$

> Ez éppenséggel az $x_1 = (1, 2, 3)^T$ kezdővektorral divergál a megoldástól.

> $Bx^{(k)} + c$ az **iterációs egyenleteknek** az általános, tömör felírása.

###### Jacobi iteráció konvergenciája

Az, hogy a $B$ mátrix **diagonálisan domináns**, elegendő feltétele a Jacobi iteráció konvergenciájának.

> Egy mátrix akkor diagonálisan domináns, ha minden sorban a diagonális elem abszolútértékben nagyobb, mint az összes többi sor-beli elem abszolútértékben vett összege.

##### Iterációs módszerek konvergenciája

Vizsgáljuk meg az $x^{(k+1)} = Bx^{(k)} + c$ iteráció által definiált $\{ ~ x^{(k)} ~ \}$ sorozat konvergenciáját. Jelöljük az eredeti egyenletrendszerünk megoldásár $x^*$-al. Az $e_k = x^{(k)} - x^*$ eltérésre a következő állítás érvényes:

Tetszőleges $x^{(0)}$ kezdővektor, esetén a $k$-adik közelítés eltérése az $x^*$ megoldástól $e_k = B^k e_0$

Következmény: Ha a $B$ mátrix **nilpotens**, akkor $B^j e_0 = 0$, tehát az iterációs eljárás véges sok lépésben megtalálja  amegoldást.

> A nilpotens azt jelenti, hogy van olyan $j$ index, amire $B^j =0$

**Globális konvergencia**: Akkor mondjuk, hogy egy iterációs sorozat globálisan konvergens, ha minden indulóvektorral ugyan azt a megoldást kapjuk.

Az  $x^{(k+1)} = Bx^{(k)} + c$ iteráció akkor és csak akkor globálisan konvergens, ha $\rho(B) < 1$.

> $\rho(B)$ a $B$ mátrix **spektrálrádiusz**-át jelenti, ami a sajátértékeinek abszolút értékben vett maximuma.

##### Gauss-Seidel iteráció

Annyiban tér el a Jacobi-iterációtól, hogy az iterációs egyenletek jobb oldalán felhasználjuk az adott iterációban már megtalált közelítő értékeket.

Például ha $x_1^{(k+1)}$ már ismert, akkot a továbbiakban $x_1^{(k)}$ helyett $x_1^{(k+1)}$-et használjunk.

Ez valamivel gyorsítja a konvergenciát.

> Jacobi, Gauss-Seidel matlab kódok kellenek?

#### Mátrixok sajátértékeinek, és sajátvektorainak numerikus meghatározása

Legyen adott egy $A$ négyzetes mátrix. Adjuk meg a $\lambda$ számot, és az $x \ne 0$ vektort úgy, hogy $Ax = \lambda x$.

Ekkor $\lambda$ az $A$ sajátértéke, és $x$ az $A$ sajátvektora.

> Baloldali sajátérték, sajátvektor: $y^T A = \lambda y^T$

Mátrix **spektruma**: Sajátértékeinek halmaza, jele: $\lambda(A)$.

Mátrix **spektrálrádiusza**: $max\{ ~ | \lambda | : \lambda \in \lambda(A) ~ \}$, jele: $\rho(A)$

##### Sajátvektor, sajátérték jelentősége

A sajátvektorok irányába eső vektorokat az $A$ mátrix megnyújtja az adott sajátvektorhoz tartozó sajátértéknek megfelelően.

##### Sajátértékek, sajátvektorok nem egyértelműek

- Egységmátrixnak az 1 $n$-szeres sajátértéke

- Egy sajátvektorral együtt annak minden nem nulla számmal szorzottja is ugyanahhoz a sajátértékhez tartozó sajátvektora

##### Sajátértékek, sajátvektorok meghatározása

Megkaphatjuk a $(A - \lambda I)x = 0$ homogén lineáris egyenletrendszerből. Ennek pontosan akkor van nulla vektortól különböző megoldása, ha az $A - \lambda I$ mátrix szinguláris.

Emiatt a sajátértékeket leírja a $det (A - \lambda I) = 0$ egyenlet. Ennek baloldalán levő $n$-edfokú polinomot az $A$ mátrix **karakterisztikus polinomjának** nevezzük.

##### * Sajátértékek korlátai

Tetszőleges $A$ mátrixra és bármely mátrixnormára $\rho(A) \le ||A||$.

A mátrix összes sajátértéke benne van a 

$$
K_i = \left\{ z \in C ~ \Bigg| ~ |z - a_{ii}| \le \sum_{k=1, k \ne i}^n |a_{ik}| \right\}
$$



##### Hatványmódszer

> A.K.A. *von Mieses vektoriterációja*

A legnagyobb abszolútértékű sajátérték meghatározására szolgál.

Az algoritmus iterációs képlete:

$$
y^k = Ax^k, x^{k+1} = \frac{y^k}{||y^k||}
$$

Kiindulási vektor:

- $x^0 \ne 0$, és

- $x_0$ nem merőleges a legnagyobb abszolút értékű sajátértékhez tartozó sajátvektorra.

###### Matlabban

```matlab
function lambda = hatv(A);
x = [rand(1) rand(1) rand(1)];
for i = 1:100
    y = A * x;
    lambda = y ./ x;
    r = (x' * y) / (x' * x);
    x = y / norm(y);
end
```

> A `./` komponensenként való osztás.

Az egyes iterációban kapott eredmények:

- `r`: Rayleigh-féle hányadossal kapott eredmény.

- `x`: Komponensenkénti becsléssel kapott eredmény.

### 2. Érintő, szelő, és húr módszer, a konjugált gradiens eljárás. Lagrange interpoláció. Numberikus integrálás.

#### Érintő módszer

> A.K.A. Newton-módszer

Tegyük fel, hogy az $f(x) = 0$ egyenlet $x^*$ egyszeres, izolált zérushelyét akarjuk meghatározni, és hogy ennek a környezetében $f(x)$ differenciálható.

Válasszunk ki ebből egy $x_0$ kezdőértéket, majd képezzük az

$$
x_{k + 1} = x_k - \frac{f(x_k)}{f'(x_k)}
$$

iterációs sorozatot.

##### A módszer geometriai jelentése

Az aktuális $x_k$ pontban meghatározzuk az $f(x)$ függvény és deriváltja értékét, ezekkel képezzük az adott ponthoz húzott érintőt, és következő iterációs pontnak azt határozzuk meg, amelyben az érintő zérushelye van.

##### Megoldás garantálása

Ha az $f(x)$ függvény kétszer folytonosan differenciálható az $x^*$ zérushely egy környezetében, akkor van olyan pont, ahonnan indulva a Newton-módszer kvadratikusan konvergens sorozatot ad meg:

$$
|x^* - x_{k+1} | \le C |x^* - x_k |^2
$$

valamely pozitív $C$ konstanssal.

#### Szelő módszer

Legyen $x^*$ az $f(x) = 0$ egyenlet egyszeres gyöke. Válasszunk alkalmas $x_0$ és $x_1$ kezdőértékeket, és ezekből kiindulva hajtsuk végre azt az iterációt, amit a következő képlet definiál:

$$
x_{k + 1} = x_k - \frac{f(x_k)(x_k - x_{k-1})}{f(x_k) - f(k_{k-1})} = \frac{ f(x_k) x_{k-1} - f(x_{k-1}) x_k }{ f(x_k) - f(x_{k - 1}) } ~ ~ ~ ~ k = 1, 2, ...
$$

Valójában annyiban tér el a Newton-módszertől, hogy $f'(x_k)$ helyett annak közelítéseként a **numerikus derivált**,

$$
\frac
{ f(x_k) - f(x_{k-1}) }
{ x_k - k_{k-1} }
$$

szerepel.

> Így tehát ez az eljárás csak egy $f(x)$ függvényt kiszámoló szubrutinra (függvényre) támaszkodik.

##### A módszer geometriai jelentése

$x_{k + 1}$ nem más, mint az $(x_k, f(x_k))$ és az $(x_{k-1}, f(x_{k-1}))$ pontokon átmenő egyenes és az $x$ tengely metszéspontjának $x$ koordinátája.

##### Tulajdonságok

- Szokás a szelő módszert olyan kezdőértékekkel indítani, amik **köztefogják** a $x^*$ gyököt.

- Ha $f'(x^*) > 0$, és $f''(x^*) > 0$, akkor $x^*$-nál nagyobb, de ahhoz közeli kezdőértékekkel **szigorúan monoton konvergencia** érhető el.

#### Húr módszer

A szelő módszer a következő módosításokkal:

- A kezdeti $x_0, x_1$ pontokban az $f(x)$ függvény **ellentétes előjelű**.

- $f(x_{k+1})$ előjelétől függően a megelőző két pontból **azt választja** a következő iterációs lépéshez, amelyikkel ez a **tulajdonság fennmarad**.

> Például ha $x_2$ pozitív, és $x_0$ negatív, $x_1$ pozitív, akkor a következő iterációban $x_2$ mellett $x_0$-t használja a módszer az $x_1$ helyett.

#### Konjugált gradiens eljárás

Optimalitálás elvein alapuló módszer.

Szimmetrikus pozitív definit mátrixú lineáris egyenletrendszerek megoldására alkalmas.

Pontos aritmetikával ugyan váges sok lépésben megtalálná a megoldást, de a kerekítési hibák miatt mégis iterációs eljárásnak kell tekinteni.

Legyen $A$ egy szimmetrikus, pozitív definit mátrix, akkor a 

$$
q(x) = \frac{1}{2} x^T A x - x^T b
$$

kvadratikus függvénynek egyetlen $x^*$ minimumpontja van, és erre $Ax^* = b$ teljesül.

Azaz az $Ax = b$ lineáris egyenletrendszer megoldása ekvivalens a $q(x)$ kvadratikus függvény minimumpontjának meghatározásával.

A többdimenziós optimalizálási eljárások rendszerint az $x_{k+1} = x_k + \alpha s_k$ alakban keresik az új közelítő megoldást, ahol $s_k$ egy keresési irány, és $\alpha$ a lépésköz.

##### Kvadratikus függvényekkel kapcsolatos összefüggések

1. A negatív gradiens a rezudiális vektor: $- \nabla q(x) = b - Ax = r$

2. Adott keresési itány mentén nem kell adaptív módon meghatározni a lépésközt, mert az optimális $\alpha$ közvetlenül megadható. A keresési irány mentén ott lesz a célfüggvény minimális, ahol a rezudiális vektor merőleges $s_k$-ra.
   $\alpha = \frac{r_k^T s_k}{s_k^T A s_k}$

##### A módszer

Adott $x_0$ kezdőpontra legyen $s_0 = r_0 = b - Ax_0$, és iteráljuk $k = 1, 2, ...$ értékekre az alábbi lépéseket, amíg a megállási feltételek nem teljesülnek:

1. $\alpha_k = \frac{r_k^T r_k}{s_k^T As_k}$: A **lépéshossz** meghatározása

2. $x_{k+1} = x_k + \alpha_k s_k$: Iterált **közelítő megoldás**

3. $r_{k+1} = r_k - \alpha_k A s_k$: Új **rezudiális vektor**

4. $\beta_{k+1} = \frac{r_{k+1}^T r_{k+1}}{r_k^T r_k}$: Segédváltozó

5. $s_{k+1} = r_{k+1} + \beta_{k+1} s_k$: Új **keresési irány**

> Korábbi gradiensmódszerek esetén egyszerűen a negatív gradienst követik minden iterációs lépésben, de felismerték hogy ez a meredek falú, enyhén lejtő völgyszerű függvények esetén szükségtelenül sok iterációs lépést eredményez a völgy két oldalán való oda-vissza ugrálás miatt. A kisebb meredekséggel rendelkező irányban viszont lényegesen gyorsabban lehetett volna haladni.
> A konjugált gradiens módszer a lépésenkénti megfelelő irányváltoztatással kiküszöböli ezt a hibát.

A megállási feltétel szokás szerint az, hogy a felhasználó előírja, hogy az utolsó néhány iterált közelítés eltérése és a lineáris egyenletrendszer két oldala különbsége normája ezekben a pontokban adott kis pozitív értékek alatt maradjanak.

##### Matlabban

```matlab
function x = kg(A, b, x);
s = b - A * x;
r = s;
for k = 1:20
    a = (r' * r) = (s' * A * s);
    x = x + a * s;
    rr = r - a * A * s;
    s = rr + s * ((rr' * rr) / (r' * r));
    r = rr
end
```

> Az `rr` valójában $r_{k+1}$, csak mivel `s` kiszámolásához $r_k$-ra is szükség van, így csak az után adjuk ártákül `r`-nek (`rr`-t).

#### Lagrange interpoláció

**Interpoláció**: Az a feladat, amikor adott $(x_i, y_i), i =1, 2, ..., m$ pontsorozaton állítunk elő egy függvényt, amely egy adott függvényosztályba tartozik, és minden ponton átmegy.

> Azaz $x_i$ helyeken a megfelelő $y_i$ értékeket vegye fel a függvény.

> Ha a keresett $f(x)$ függvény polinom, akkor **polinominterpolációról** beszélünk.

**Interpoláció másik jelentése**: A közelítő függvény segítségével az eredeti $f(x)$ függvény értékét egy olyan $\hat{x}$ pontban becsüljük az interpoláló $p(x)$ polinom $p(\hat{x})$ helyettesítési értékével, amelyre:

$$
\hat{x} \in [ ~ min(x_1, x_2, ..., x_m), max(x_1, x_2, ..., x_m) ~ ]
$$

Ezzel szemben ha

$$
\hat{x} \notin [ ~ min(x_1, x_2, ..., x_m), max(x_1, x_2, ..., x_m) ~ ]
$$

teljesül, akkor **extrapolációról** van szó.

**Spline interpoláció**: Több alacsony fokszámú polinomból összerakott függvényt keres úgy, hogy az adott pontokon való áthaladás megkövetelése mellett az is elvárás, hogy a szomszédos polinomok a csatlakozási pontokban **előírt derivált értékeket** vegyenek föl.

##### Polinomok fokszáma

Polinom interpoláció esetén a polinom fokszáma, $n$ egyenlő $m - 1$-el.

Spline alkalmazásakor a fokszám lényegesen kisebb, mint az alappontok száma.

Amennyiben egy olyan polinomot illesztünk, amelynek fokszáma kisebb, mint $m - 1$, akkor **görbeillesztésről** beszélünk.

> Görbeillesztéskor a polinom persze nem feltétlen megy át minden alapponton.

##### Lagrange interpoláció

> Lagrange interpolációkor feltesszük, hogy az alappontok különbözőek, de ez nem egy túl erős feltétel, hiszen nem is lehet azonos $x$ koordinátán két különböző $y$ értéket érinteni egy függvénnyel.

A Lagrange interpoláció az interpoláló polinomokat

$$
p_n(x) = \sum_{i=0}^n f(x_i)L_i(x)
$$

alakban adja meg, ahol

$$
L_i(x) = \prod_{j=0, j\ne i}^n \frac{x-x_j}{x_i-x_j} = 
\frac
{(x - x_0)(x - x_1) ... (x - x_{i-1})(x - x_{i+1}) ... (x - x_n)}
{(x_i - x_0)(x_i - x_1) ... (x_i - x_{i-1})(x_i - x_{i+1}) ... (x_i - x_n)}
$$

Legyenek adottak az $x_0, ..., x_n$ páronként különböző alappontok. Ekkor az $f(x_i), i = 0, 1, ..., n$ függvényértékekhez egyértelműen létezik olyan legfeljebb $n$-edfokú interpoláló polinom, amely megegyezik a Lagrange interpolációs polinommal.

##### Matlabban

```matlab
function [C, L] = lagran(X, Y)
w = length(X);
n = w - 1;
L = zeros(w, w);
for k = 1:n+1
    V = 1;
    for j = 1:n+1
        if k ~= j
            V = conv(V, poly(X(j))) / (X(k) - X(j));
        end
    end
end
C = Y * L;
```

> `conv(u, v)`: Konvolúció, `u` a maszk, amit keresztül tol `v`-n.
> 
> `poly(A)`: Karakterisztikus polinom-ot számol ki mátrixból, vagy sajátértékekből.
> 
> `~=`: Nem-egyenlő operátor.

#### Numerikus integrálás

A kvadratúra a numerikus integrálás szinonimája, amikor a

$$
\int_a^b f(x) ~ dx = F(b) - F(a)
$$

határozott integrál közelítése a feladat. Itt $F(x)$ az $f(x)$ integrálandó függvény primitív függvénye. Ez utóbbi nem minden esetben áll rendelkezésre, sőt sokszor nem is elemi függvény, nem adható meg zárt alakban.

##### Kvadratúra-formula

A határozott integrálokat szokás

$$
\int_a^b = f(x) ~ dx \approx Q_n(f) = \sum_{i = 1}^n w_i f(x_i)
$$

alakban közelíteni, ahol $Q_n(f)$-et **kvadratúra-formulának** nevezzük.

Általában feltesszük, hogy $x_i \in [a, b]$ teljesül az $x_i$ **alappontokra**, és ezek **páronként különbözőek**.

A $w_i$ számokat **súlyoknak** hívjuk.

##### Integrál, és kvadratúra-formula tulajdonságai

$$
\int_a^b f(x) + g(x) ~ dx  = \int_a^b f(x) ~ dx + \int_a^b g(x) ~ dx

\\

Q_n (f + g) = 
\sum_{i = 1}^n w_i (f(x_i) + g(x_i))  = 
\sum_{i = 1}^n w_i f(x_i) + \sum_{i = 1}^n w_i g(x_i) = 
Q_n(f) + Q_n(g)

\\

\int_a^b \alpha f(x) ~ dx  = \alpha \int_a^b f(x) ~ dx

\\


Q_n(\alpha f) = 
\sum_{i=1}^n w_i \alpha f(x_i) = 
\alpha \sum_{i=1}^n w_i f(x_i) = 
\alpha Q_n(f)

\\


\int_a^b f(x) ~ dx = 
\int_a^{z_1} f(x) ~ dx + ... + \int_{z_{m-1}}^{z_m} f(x) ~ dx + \int_{z_m}^b f(x) ~ dx
$$

##### Kvadratúra-formula képlethibája

$R_n(f) = \int_a^b f(x) ~ dx - Q_n(f)$

Ha $R_n(f) = 0$, akkor a **kvadratúra-formula pontos** $f(x)$-re.

Kvadratúra-formula pontossági rendje az $r$ természetes szám, ha az pontos az $1, x, x^2, ..., x^r$ hatványfüggvényekre, azaz $R_n(x^k) = 0$ minden $q \le k \le r$-re, de nem pontos $x^{r+1}$-re.

A $Q_n$, $n$ alappontos kvadratúra-formula rendje legfejlebb $2n - 1$ lehet.

##### Interpolációs kvadratúra-formulák

Azt mondjuk, hogy $Q_n(f) = \sum_{i=1}^n w_i f(x_i)$ egy interpolációs kvadratúra-formula, ha az előáll az alappontokra felírt Lagrange polinom integrálásával:

$$
\int_a^b f(x) ~ dx \approx 
\int_a^b p_{n-1} (x) ~ dx = 
\int_a^b \sum_{i = 1}^n f(x_i) L_i(x) ~ dx = 
\sum_{i=1}^n f(x_i) \int_a^b L_i(x) ~ dx
$$

ahonnan $w_i = \int_a^b L_i(x) ~ dx$.

> Az alappont az interpolációra, és a kvadratúrára is vonatkozik.

Minden $n$ alappontra épülő $Q_n$ interpolációs kvadratúra-formula rendje legalább $n - 1$.

Ha egy $Q_n$ kvadratúra-formula rendje legalább $n - 1$, akkor az interpolációs kvadratúra-formula.

##### Véges differenciák

Ekvidisztáns alappontokat adunk meg.

Szomszédos alappontok **távolsága állandó**: $h = x_{i + 1} - x_i$.

Az interpolációs alappontok: $x_i = x_0 + ih, i = 0, ..., n-1$

Az adott $x_k$ alappontokhoz és $f_k = f(x_k)$ függvény értékekhez tartozó $\Delta^i f_k$ *i-edrendű véges differenciákat* a következő kettős rekurzióval definiáljuk:

$$
\begin{align}
\Delta^0 f_k & = f_k \\
\Delta^i f_k & = \Delta^{i - 1} f_{k + 1} - \Delta^{i - 1} f_k
\end{align}
$$

Természetes számokra értelmezett binomiális együtthatók általánostásaként vezessük be a:

$$
\binom{t}{j} = \frac{t(t - 1) ... (t-j + 1)}{j!}
$$

jelölést a $t = \frac{x - x_0}{h}$ transzformációhoz.

A véges differenciákkal felírt Lagrange interpolációs polinom:

$$
p_{n-1}(x_0 + th) = f_0 + \binom{t}{1} \Delta f_0 + \binom{t}{2} \Delta^2 f_0 + ... + \binom{t}{n - 1} \Delta^{n-1} f_0 = \sum_{i = 0}^{n - 1} \binom{t}{i} \Delta^i f_0
$$

##### Newton-Cotes formulák

Az interpolációs kvadratúra-formulák egy régi osztálya.

Ekvidisztáns alappontokat használnak.

> Azaz a szomszédosak közt ugyan annyi a távolság.

Ha az integrál határai szerepelnek az alappontok közt, akkor *zárt-,* ha a határok nem alappontok, akkor *nyitott formuláról* beszélünk.

###### Zárt formulákra összefüggések

$$
h = \frac{b - a}{n - 1}, a = x_0, b = x_{n-1}, x_i = x_0 + ih ~ ~ ~ ~ 0 \le i \le n - 1
$$

###### Nyitott formulákra összefüggések

$$
h = \frac{b - a}{n + 1}, a = x_0 - h, b = x_{n-1} + h, x_i = x_0 + ih ~ ~ ~ ~ 0 \le i \le n - 1
$$

###### $n$-edik Newton-Cotes formula

$t = \frac{x - x_0}{h}$ új változó mellett az $n$-edig Newton-Cotes formula:

$$
\int_a^b p_{n-1} (x_0 + th) ~ dx = 
\int_a^b \sum_{i=0}^{n-1} \binom{t}{i} \Delta^i f_0 ~ dx = 
\sum_{i=0}^{n - 1} \Delta^i f_0 \int_a^b \binom{t}{i} ~ dx
$$

> A $t$ lényegében az adott változó eltolását fejezi ki az $x_0$-tól.

> A $\Delta^i$ véges differenciál.

Ha a formula zárt:

$$
\sum_{i=0}^{n - 1} \Delta^i f_0 \int_a^b \binom{t}{i} ~ dx = 
h \sum_{i=0}^{n - 1} \Delta^i f_0 \int_0^{n - 1} \binom{t}{i} ~ dt
$$

Ha a formula nyitott:

$$
\sum_{i=0}^{n - 1} \Delta^i f_0 \int_a^b \binom{t}{i} ~ dx = 
h \sum_{i=0}^{n - 1} \Delta^i f_0 \int_{-1}^{n} \binom{t}{i} ~ dt
$$

###### Első négy zárt Newton-Cotes formula

1. $\int_{x_0}^{x_1} f(x) ~ dx \approx \frac{h}{2}(f_0 + f_1)$: **Trapéz szabály**

2. $\int_{x_0}^{x_2} f(x) ~ dx \approx \frac{h}{3}(f_0 + 4 f_1 + f_2)$: **Simpson-szabály**

3. $\int_{x_0}^{x_3} f(x) ~ dx \approx \frac{3h}{8}(f_0 + 3 f_1 + 3 f_2 + f_3)$: **Simpson $\frac{3}{8}$-os szabálya**

4. $\int_{x_0}^{x_4} f(x) ~ dx \approx \frac{2h}{45}(7 f_0 + 32 f_1 + 12 f_2 + 32 f_3 + 7 f_4)$: **Bool-szabály**

##### Matlabban

```matlab
function f = fxlog(x)
f = x .* log(x);
```

A fentebbi függvény az $xlog(x)$ függvényértéket kiszámoló eljárás, ennek numerikus integrálása a $[2, 4]$ intervallumon:

```matlab
quad(@fxlog, 2, 4);
```

> Eredményül 6.7041-et logol az interpreter.
