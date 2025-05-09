<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Pizza;
use App\Form\CategoryType;
use App\Form\PizzaType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MasterController extends AbstractController
{
    #[Route('/master', name: 'master-home')]
    public function show(EntityManagerInterface $entityManager): Response
    {
        $pizza = $entityManager->getRepository(Pizza::class)->findAll();


        $category = $entityManager->getRepository(Category::class)->findAll();

        return $this->render('master/index.html.twig', [
            'categories' => $category,
            'pizzas' => $pizza
        ]);
    }

    #[Route('/pizza/add', name: 'pizzaAdd')]
    public function pizzaAdd(EntityManagerInterface $entityManager, Request $request): Response
    {
        $pizza = new Pizza();
        $form = $this->createForm(PizzaType::class, $pizza);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $pizza = $form->getData();
            $entityManager->persist($pizza);
            $entityManager->flush();
            return $this->redirectToRoute('master-home');
        }
        return $this->render('master/pizza.html.twig', [
            'form' => $form,
        ]);
    }

    #[Route('/pizza/update/{id}', name: 'pizzaUpdate')]
    public function pizzaUpdate(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $pizza = $entityManager->getRepository(Pizza::class)->find($id);
        if (!$pizza) {
            throw $this->createNotFoundException('Pizza not found');
        }
        $form = $this->createForm(PizzaType::class, $pizza);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();
            return $this->redirectToRoute('master-home');
        }
        return $this->render('master/pizza.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/pizza/delete/{id}', name: 'pizzaDelete')]
    public function pizzaDelete(EntityManagerInterface $entityManager, int $id): Response
    {
        $pizza = $entityManager->getRepository(Pizza::class)->find($id);

        if (!$pizza) {
            throw $this->createNotFoundException('Pizza not found');
        }

        $entityManager->remove($pizza);
        $entityManager->flush();

        return $this->redirectToRoute('master-home');
    }

    //category create/update/delete

    #[Route('/cat/add', name: 'categoryAdd')]
    public function catAdd(EntityManagerInterface $entityManager, Request $request): Response
    {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $category = $form->getData();
            $entityManager->persist($category);
            $entityManager->flush();
            return $this->redirectToRoute('master-home');
        }
        return $this->render('master/category.html.twig', [
            'form' => $form,
        ]);
    }


    #[Route('/cat/update/{id}', name: 'categoryUpdate')]
    public function catUpdate(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $category = $entityManager->getRepository(Category::class)->find($id);

        if (!$category) {
            throw $this->createNotFoundException('Category not found');
        }

        $form = $this->createForm(CategoryType::class, $category);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();
            return $this->redirectToRoute('master-home');
        }
        return $this->render('master/catUpdate.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/cat/delete/{id}', name: 'categoryDelete')]
    public function catDelete(EntityManagerInterface $entityManager, int $id): Response
    {
        $category = $entityManager->getRepository(Category::class)->find($id);

        if (!$category) {
            throw $this->createNotFoundException('Category not found');
        }

        $entityManager->remove($category);
        $entityManager->flush();

        return $this->redirectToRoute('master-home');
    }
}
