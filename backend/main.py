from tkinter import *
from experta import *
import random


class Welcome(KnowledgeEngine):

    # init function
    def __init__(self, countryy, carType, fuel, money):
        self.country = countryy
        self.cartype = carType
        self.fuel = fuel
        self.money = money
        self.carResult = ""
        super().__init__()

    @DefFacts()
    def initial(self):
        yield Fact(action="find_car")

# ************ FACTS *******************

    # type sport / commercial / Populaire / haute_game
    @Rule(Fact(action='find_car'), NOT(Fact(typeCar=W())), salience=1)
    def carType(self):
        self.declare(Fact(typeCar=self.cartype))  # first

    # factory country france / allemangne / Japon / USA
    @Rule(Fact(action='find_car'), NOT(Fact(manifactor=W())), salience=1)
    def carManifactor(self):
        self.declare(Fact(manifactor=self.country))  # first

    # fuel mazout / essence / electric
    @Rule(Fact(action='find_car'), NOT(Fact(fuel=W())), salience=1)
    def carFuel(self):
        self.declare(Fact(fuel=self.fuel))

    # Prices 30-70] / [70-180] / [180-600]
    @Rule(Fact(action='find_car'), NOT(Fact(price=W())), salience=1)
    def carPrice(self):
        self.declare(Fact(price=self.money))

# ************ RULES *******************

    @Rule(Fact(action='find_car'), Fact(typeCar="populaire"), Fact(manifactor="france"))
    def r1(self):
        self.declare(Fact(carMarque="peugot"))

    @Rule(Fact(action='find_car'), Fact(typeCar="commercial"), Fact(manifactor="japon"))
    def r2(self):
        self.declare(Fact(carMarque="toyota"))

    @Rule(Fact(action='find_car'), Fact(typeCar="haute gamme"), Fact(manifactor="allemangne"))
    def r3(self):
        self.declare(Fact(carMarque="mercides"))

    @Rule(Fact(action='find_car'), Fact(carMarque="mercides"), Fact(price="[180-600]"))
    def r4(self):
        self.declare(Fact(car="mercides class S"))

    @Rule(Fact(action='find_car'), Fact(fuel="electric"), Fact(carMarque="peugot"), Fact(price="[30-70]"))
    def r5(self):
        self.declare(Fact(car="Peugot E-208"))

    @Rule(Fact(action='find_car'), Fact(carMarque="mercides"), Fact(price="[70-180]"))
    def r6(self):
        self.declare(Fact(car="mercides class A"))

    @Rule(Fact(action='find_car'), Fact(typeCar="haute gamme"), Fact(manifactor="USA"), Fact(fuel="electric"))
    def r7(self):
        self.declare(Fact(carMarque="Tesla"))

    @Rule(Fact(action='find_car'), Fact(carMarque="Tesla"), Fact(price="[70-180]"))
    def r8(self):
        self.declare(Fact(car="Tesla model 3"))

    @Rule(Fact(action='find_car'), Fact(typeCar="sport"), Fact(manifactor="allemangne"), Fact(fuel="essence"))
    def r9(self):
        self.declare(Fact(carMarque="Audi"))

    @Rule(Fact(action='find_car'), Fact(carMarque="Audi"), Fact(price="[180-600]"))
    def r10(self):
        self.declare(Fact(car="Audi_Rs3"))

    @Rule(Fact(action='find_car'), Fact(carMarque="toyota"), Fact(price="[70-180]"))
    def r11(self):
        self.declare(Fact(car="Toyota Hilux"))

    @Rule(Fact(action='find_car'), Fact(car=MATCH.car), salience=-998)
    def bestCar(self, car):
        # print("\n The recommended car for you is "+car+"\n")
        self.carResult = car

    @Rule(Fact(action='find_car'), NOT(Fact(car=MATCH.car)), salience=-999)
    def not_bestCar(self):
        print("need more info to make a decision\n")
        self.carResult = "no idea"


def API_ENDPOINT(countryy, carType, fuel, money):
    engine = Welcome(countryy, carType, fuel, money)
    engine.reset()
    engine.run()
    return engine.carResult
