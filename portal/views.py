# -*- coding: utf-8 -*-
from django.shortcuts import render


# Create your views here.
from django.shortcuts import HttpResponse
from django.core.exceptions import PermissionDenied
from .models import Board
from .models import Tasks
from .models import LocalUser
import json

def index(request):
    if request.method == "POST":
        j = json.loads(request.POST['json'])
        board = Board.objects.filter(owner__user=request.user)
        for item_board in range(len(board)):
            if j['tasks__list{}'.format(item_board+1)]:
                t = Tasks.objects.filter(owner__user=request.user).filter(id__in = [int(i.replace('task_id__','')) for i in j['tasks__list{}'.format(item_board+1)]])
            else:
                t = []
            board[item_board].tasks = t
            board[item_board].save()
        return HttpResponse('OK')

    b = Board.objects.filter(owner__user=request.user).prefetch_related('tasks')
    u = LocalUser.objects.get(user=request.user)
    username = "{} {}.".format(u.user.last_name.encode('utf-8'), \
                               u.user.first_name[:1].encode('utf-8'))
    content = {
            'tasks1' : b[0].tasks.all(),
            'tasks2' : b[1].tasks.all(),
            'tasks3' : b[2].tasks.all(),
            'tasks4' : b[3].tasks.all(),
            'username': username,
    }

    return render(request, './portal/index.html', content)

def create_new_task(request):
    print(request.POST)
    if request.POST['new_task'].strip() == '':
        print('PUSTO')
        return HttpResponse('PUSTO')
    t = Tasks(title=request.POST['new_task'], owner=LocalUser.objects.get(id=request.user.id))
    t.save()
    board = Board.objects.filter(owner__user=request.user)
    board[0].tasks.add(t)
    board[0].save()
    content = {
        'tasks'     :   request.POST['tasks'],
        'task_id'   :   t.id,
        'task_title':   t.title,
    }
    return HttpResponse(json.dumps(content))

def delete_task(request):
    print(dir(request))
    task_id = int(request.POST['task_id'].replace('task_id__',''))
    t = Tasks.objects.filter(owner__user=request.user).filter(id=task_id)
    if len(t) < 1:
        raise PermissionDenied()
    t.delete()
    content = {
        'task_id'   :   'task_id__{}'.format(task_id)
    }
    return HttpResponse(json.dumps(content))
