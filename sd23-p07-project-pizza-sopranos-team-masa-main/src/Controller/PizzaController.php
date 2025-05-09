<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Pizza;
use App\Form\PizzaType;
use App\Repository\PizzasRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PizzaController extends AbstractController {
    #[Route('/pizza/{id}', name: 'pizza')]
    public function Detail(EntityManagerInterface $entityManager,int $id): Response
    {
        //id ophalen van cat
        $category = $entityManager->getRepository(Category::class)->find($id);
        //alle producten ophalen die bij opgehaalde id horen
        $pizzas = $category->getPizzas();


        return $this->render('pizza/index.html.twig', [
            'category' => $category,
            'pizzas' => $pizzas
        ]);
    }
    #[Route('/pizza/detail/{id}', name: 'pizza-detail')]
    public function pizzaDetail(EntityManagerInterface $entityManager, int $id): Response
    {
        $pizza = $entityManager->getRepository(Pizza::class)->find($id);
        
        if (!$pizza) {
            throw $this->createNotFoundException('Pizza not found');
        }
        return $this->render('pizza/detail.html.twig', [
            'pizza' => $pizza,
        ]);
    }

    #[Route('/pizza', name: 'pizza-app')]
    public function show(EntityManagerInterface $entityManager): Response
    {
        $pizza = $entityManager->getRepository(Pizza::class)->findAll();

        return $this->render('pizza/pizza.html.twig', [
            'pizzas' => $pizza
        ]);
    }
}
